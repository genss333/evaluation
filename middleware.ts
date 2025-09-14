import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { Method } from "./lib/api-client";

// --- Configuration ---
const setupConfig = {
  locales: ["en", "th"],
  secretKey: new TextEncoder().encode(process.env.JWT_SECRET_KEY),
  protectedPaths: ["/home", "/probation"],
};

function isProtectedPath(pathname: string): boolean {
  return setupConfig.protectedPaths.some((path) => pathname.startsWith(path));
}

async function onRefreshToken(
  request: NextRequest
): Promise<NextResponse | null> {
  try {
    const apiResponse = await fetch(new URL("/api/auth", request.url), {
      method: Method.PATCH,
      headers: {
        Cookie: request.headers.get("Cookie") || "",
      },
    });

    if (apiResponse.ok) {
      const nextResponse = NextResponse.next();

      const newCookies = apiResponse.headers.get("set-cookie");
      if (newCookies) {
        nextResponse.headers.set("set-cookie", newCookies);
      }
      return nextResponse;
    }
  } catch (refreshError) {
    console.error("Token refresh failed:", refreshError);
  }

  return null;
}

async function handleSessionVerification(
  request: NextRequest
): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  if (isProtectedPath(pathname)) {
    const loginUrl = new URL(`/login`, request.url);

    try {
      if (!accessToken && refreshToken) {
        const res = await onRefreshToken(request);
        if (res) {
          return res;
        }
      } else if (accessToken && refreshToken) {
        await jwtVerify(accessToken, setupConfig.secretKey);
      }

      return NextResponse.redirect(loginUrl);
    } catch (error) {
      const isJwtExpiredError =
        error instanceof Error && error.name === "JWTExpired";

      if (isJwtExpiredError) {
        const refreshResponse = await onRefreshToken(request);
        if (refreshResponse) {
          return refreshResponse;
        }
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export async function middleware(request: NextRequest) {
  return await handleSessionVerification(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
