import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { Method } from "./lib/api-client";

// This is a placeholder. Assuming 'Method' is an enum like { PATCH: "PATCH" }.

// --- Configuration ---
const setupConfig = {
  locales: ["en", "th"],
  secretKey: new TextEncoder().encode(process.env.JWT_SECRET_KEY),
  protectedPaths: ["/home", "/probation"],
};

// --- Helper Functions ---

/**
 * Checks if the pathname already starts with a supported locale.
 * e.g., /en/dashboard -> true
 * e.g., /dashboard -> false
 */
function pathnameHasLocale(pathname: string): boolean {
  return setupConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

/**
 * Checks if a given path (without locale) is a protected route.
 */
function isProtectedPath(pathname: string): boolean {
  return setupConfig.protectedPaths.some((path) => pathname.startsWith(path));
}

async function refreshToken(
  request: NextRequest
): Promise<NextResponse | null> {
  try {
    const apiResponse = await fetch(new URL("/api/auth", request.url), {
      method: Method.PATCH,
      headers: {
        Cookie: request.headers.get("Cookie") || "",
      },
    });

    // FIX: The original code tried to re-verify the OLD access token from the
    // incoming request, which would always fail. The correct approach is to
    // take the NEW tokens from the API response and pass them to the user.

    if (apiResponse.ok) {
      // The API has sent back new tokens in the 'Set-Cookie' header.
      // We create a response to continue the user's request.
      const nextResponse = NextResponse.next();

      // Copy the 'Set-Cookie' header from the API response to our new response.
      // This sends the new tokens to the user's browser.
      const newCookies = apiResponse.headers.get("set-cookie");
      if (newCookies) {
        nextResponse.headers.set("set-cookie", newCookies);
      }
      return nextResponse;
    }
  } catch (refreshError) {
    console.error("Token refresh failed:", refreshError);
  }

  // If the refresh attempt fails for any reason, return null.
  // The caller will then handle the failure, usually by redirecting to login.
  return null;
}

/**
 * Verifies the user's session for protected paths.
 */
async function handleSessionVerification(
  request: NextRequest
): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;

  if (isProtectedPath(pathname)) {
    const loginUrl = new URL(`/login`, request.url);

    if (!accessToken) {
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verify the existing access token.
      await jwtVerify(accessToken, setupConfig.secretKey);
    } catch (error) {
      // Check if the error is specifically a token expiration error.
      const isJwtExpiredError =
        error instanceof Error && error.name === "JWTExpired";

      if (isJwtExpiredError) {
        // Token has expired, try to refresh it.
        const refreshResponse = await refreshToken(request);
        if (refreshResponse) {
          // Refresh was successful, send the response with new tokens.
          return refreshResponse;
        }
      }

      // If token is invalid for any other reason, or if refresh fails, redirect to login.
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// --- Main Middleware Logic ---

export async function middleware(request: NextRequest) {
  return await handleSessionVerification(request);
}

// --- Middleware Config ---
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
