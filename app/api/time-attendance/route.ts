import { Method } from "@/lib/api-client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const formID = searchParams.get("formID");

    if (!formID) {
      return NextResponse.json(
        { message: "formID is required" },
        { status: 400 }
      );
    }

    const externalApiResponse = await fetch(
      `http://10.51.192.161:8080/api/users/timeattendance`,
      {
        method: Method.GET,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!externalApiResponse.ok) {
      return NextResponse.json(
        {
          message: `Error from external API: ${await externalApiResponse.text()}`,
        },
        { status: externalApiResponse.status }
      );
    }

    const data = await externalApiResponse.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error("Route Handler Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
