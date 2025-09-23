import { Method } from "@/lib/api-client";
import { User } from "@/models/user";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
interface SessionPayload extends User {}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const user = cookieStore.get("user")?.value;
  if (!token) {
    return null;
  }

  try {
    await jwtVerify<SessionPayload>(token, secretKey);
    if (!user) {
      return null;
    }
    const payload: User = JSON.parse(user);
    return payload;
  } catch (error) {
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "username and password is required!" },
        { status: 400 }
      );
    }

    const response = await fetch(`http://10.51.192.161:8080/api/auth/login`, {
      method: Method.POST,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      return NextResponse.json(
        { message: `api error ${errorMsg}` },
        { status: response.status }
      );
    }

    const { token, refresh_token, user } = await response.json();

    const cookieStore = await cookies();

    cookieStore.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 20,
    });

    const userPayload: User = {
      token,
      user,
    };

    cookieStore.set("user", JSON.stringify(userPayload), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 20,
    });

    cookieStore.set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// export async function PATCH() {
//   const cookieStore = await cookies();
//   const refreshToken = cookieStore.get("refresh_token");

//   if (!refreshToken) {
//     return NextResponse.json(
//       { message: "Refresh token not found" },
//       { status: 401 }
//     );
//   }

//   try {
//     const { payload } = await jwtVerify(refreshToken.value, secretKey);

//     const userPayload = {
//       id: payload.id,
//       email: payload.email,
//       name: payload.name,
//       role: payload.role,
//     };

//     cookieStore.set("access_token", newAccessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       path: "/",
//       maxAge: 60 * 20,
//     });

//     cookieStore.set("refresh_token", newRefreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       path: "/",
//       maxAge: 60 * 60 * 24 * 7,
//     });

//     return NextResponse.json({ token: newAccessToken }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Invalid refresh token" },
//       { status: 401 }
//     );
//   }
// }

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    cookieStore.delete("lang");

    return NextResponse.json(
      { message: "Log out successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
