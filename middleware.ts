import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { Method } from "./lib/api-client";

// --- Configuration ---
const setupConfig = {
  locales: ["en", "th"],
  defaultLocale: "en",
  secretKey: new TextEncoder().encode(process.env.JWT_SECRET_KEY),
  protectedPaths: ["/home"],
};

// --- Helper Functions ---

function pathnameHasLocale(pathname: string): boolean {
  return setupConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

function isProtectedPath(pathname: string): boolean {
  return setupConfig.protectedPaths.some((path) => pathname.startsWith(path));
}

// --- Middleware Handlers ---

function handleLocaleRedirect(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;
  if (!pathnameHasLocale(pathname)) {
    const newUrl = new URL(
      `/${setupConfig.defaultLocale}${pathname}`,
      request.url
    );
    return NextResponse.redirect(newUrl);
  }
  return null;
}

async function refreshToken(
  request: NextRequest
): Promise<NextResponse | null> {
  try {
    const response = await fetch(new URL("/api/auth", request.url), {
      method: Method.PATCH,
    });

    if (response.ok) {
      const newAccessToken = request.cookies.get("access_token")?.value;
      if (newAccessToken) {
        await jwtVerify(newAccessToken, setupConfig.secretKey);

        const nextResponse = NextResponse.next();

        return nextResponse;
      }
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
  const locale = pathname.split("/")[1] || setupConfig.defaultLocale;
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

  if (isProtectedPath(pathnameWithoutLocale)) {
    const loginUrl = new URL(`/${locale}/login`, request.url);

    if (!accessToken) {
      return NextResponse.redirect(loginUrl);
    }

    try {
      await jwtVerify(accessToken, setupConfig.secretKey);
      return NextResponse.next();
    } catch (error) {
      console.error("Access token verification failed:", error);

      const isJwtExpiredError =
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code?: string }).code === "ERR_JWT_EXPIRED";

      if (isJwtExpiredError) {
        const response = await refreshToken(request);
        if (response) {
          return response;
        }
      }

      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// --- Main Middleware Logic ---

export async function middleware(request: NextRequest) {
  const localeRedirect = handleLocaleRedirect(request);
  if (localeRedirect) {
    return localeRedirect;
  }

  return await handleSessionVerification(request);
}

// --- Middleware Config ---
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
