import { Method } from "@/lib/api-client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get("authorization");

    if (!authorization) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const externalApiResponse = await fetch(
      `http://10.51.192.161:8080/api/eval/forms`,
      {
        method: Method.GET,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authorization}`,
        },
      }
    );

    // 4. Check if the external API call was successful
    if (!externalApiResponse.ok) {
      // Forward the error from the external API to the client
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
