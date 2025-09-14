import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Define the languages your application supports
const SUPPORTED_LANGS = ["en", "th"];

export async function POST(request: Request) {
  try {
    const { lang } = await request.json();

    // --- Input Validation ---
    // Ensure the language is a supported one to prevent setting invalid cookies.
    if (!lang || !SUPPORTED_LANGS.includes(lang)) {
      return NextResponse.json(
        { error: "Invalid language provided." },
        { status: 400 } // 400 Bad Request
      );
    }

    // --- Set the Cookie ---
    // The `cookies()` function from `next/headers` is the standard way to manage
    // cookies in App Router Route Handlers and Server Actions.
    (await cookies()).set("lang", lang, {
      path: "/", // Make the cookie available on all pages
      httpOnly: true, // Prevents client-side JS from accessing the cookie (improves security)
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "lax", // Good balance of security and usability
      maxAge: 60 * 60 * 24 * 365, // Expires in 1 year
    });

    return NextResponse.json({ message: "Language set successfully." });
  } catch (error) {
    console.error("Failed to set language cookie:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
