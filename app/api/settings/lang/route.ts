import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { lang } = await request.json();

  if (!lang) {
    return NextResponse.json({ message: "missing lang " }, { status: 400 });
  }

  const cookiesStore = await cookies();

  cookiesStore.set("lang", lang);

  return NextResponse.json({ success: true });
}
