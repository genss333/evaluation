import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { Method } from "./lib/api-client";

// --- Configuration ---
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET_KEY) {
  throw new Error("Missing environment variable JWT_SECRET_KEY");
}
const secretKey = new TextEncoder().encode(JWT_SECRET_KEY);

const setupConfig = {
  locales: ["en", "th"],
  defaultLocale: "en",
  protectedPaths: ["/home", "/probation"], // Paths without locale prefix
};

function pathnameHasLocale(pathname: string): boolean {
  return setupConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

function isProtectedPath(pathname: string): boolean {
  return setupConfig.protectedPaths.some((path) => pathname.startsWith(path));
}

// --- Main Middleware Logic ---

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathnameHasLocale(pathname)) {
    const newUrl = new URL(
      `/${setupConfig.defaultLocale}${pathname}`,
      request.url
    );
    return NextResponse.redirect(newUrl);
  }

  const locale = pathname.split("/")[1] || setupConfig.defaultLocale;
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
  const loginUrl = new URL(`/${locale}/login`, request.url);

  // If it's not a protected path, allow the request to continue.
  if (!isProtectedPath(pathnameWithoutLocale)) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("access_token")?.value;

  if (!accessToken) {
    console.log("No access token found, redirecting to login.");
    return NextResponse.redirect(loginUrl);
  }

  try {
    await jwtVerify(accessToken, secretKey);
    return NextResponse.next();
  } catch (error) {
    const isJwtExpiredError =
      (error as { code?: string }).code === "ERR_JWT_EXPIRED";

    if (isJwtExpiredError) {
      console.log("Access token expired. Attempting to refresh...");
      try {
        const refreshApiResponse = await fetch(
          new URL("/api/auth", request.url),
          {
            method: Method.PATCH,
          }
        );

        if (refreshApiResponse.ok) {
          console.log(
            "Token refresh successful. Setting new cookies and redirecting."
          );
          const response = NextResponse.redirect(request.url);

          const newAccessToken =
            refreshApiResponse.headers.get("x-access-token");
          const newRefreshToken =
            refreshApiResponse.headers.get("x-refresh-token");

          if (newAccessToken) {
            response.cookies.set("access_token", newAccessToken, { path: "/" });
          }
          if (newRefreshToken) {
            response.cookies.set("refresh_token", newRefreshToken, {
              path: "/",
              httpOnly: true,
            });
          }

          return response;
        }
      } catch (refreshError) {
        console.error("Token refresh fetch failed:", refreshError);
      }
    }

    console.log("Token invalid or refresh failed. Redirecting to login.");
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }
}

// --- Middleware Config ---
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
