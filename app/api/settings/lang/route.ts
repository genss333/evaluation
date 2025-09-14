import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SUPPORTED_LANGS = ["en", "th"];

export async function POST(request: Request) {
  try {
    const { lang } = await request.json();

    if (!lang || !SUPPORTED_LANGS.includes(lang)) {
      return NextResponse.json(
        { error: "Invalid language provided." },
        { status: 400 } // 400 Bad Request
      );
    }

    (await cookies()).set("lang", lang, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
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
