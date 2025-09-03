import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY); // ควรเก็บ Secret Key ใน .env

// create JWT
async function createToken(payload: JWTPayload, expiresIn: string) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey);
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // fake auth
    if (email !== "user@example.com" || password !== "1234") {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
    // --------------------------------------------------------

    const userPayload = {
      id: "1234",
      email: "user@example.com",
      name: "Test User",
    };

    const accessToken = await createToken(userPayload, "15m");

    const refreshToken = await createToken({ id: userPayload.id }, "7d");

    const cookieStore = await cookies();

    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15,
    });

    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token");

  if (!refreshToken) {
    return NextResponse.json(
      { message: "Refresh token not found" },
      { status: 401 }
    );
  }

  try {
    const { payload } = await jwtVerify(refreshToken.value, secretKey);

    const userPayload = {
      id: payload.id,
      email: payload.email,
      name: payload.name,
    };
    const newAccessToken = await createToken(userPayload, "15m");

    const newRefreshToken = await createToken({ id: userPayload.id }, "7d");

    cookieStore.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15,
    });

    cookieStore.set("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ message: "Token refreshed" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 401 }
    );
  }
}
