import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

// --- Configuration ---
const setupConfig = {
  locales: ["en", "th"],
  defaultLocale: "en",
  secretKey: new TextEncoder().encode(process.env.JWT_SECRET_KEY),
  protectedPaths: ["/home", "/probation"],
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
