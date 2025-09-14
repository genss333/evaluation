import { User } from "@/models/user";
import { Role } from "@/models/user-role";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY); // ควรเก็บ Secret Key ใน .env
interface SessionPayload extends JWTPayload, User {}

const usersDB: Array<User & { password: string }> = [
  {
    id: "1",
    email: "user@gmail.com",
    password: "0000",
    name: "Test ESS",
    role: Role.ESS,
  },
  {
    id: "2",
    email: "sup@gmail.com",
    password: "0000",
    name: "Test MSS",
    role: Role.MSS,
  },
];

// create JWT
async function createToken(payload: JWTPayload, expiresIn: string) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify<SessionPayload>(token, secretKey);
    return payload;
  } catch (error) {
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // fake auth
    const user = usersDB.find((dbUser) => dbUser.email === email);
    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const { password: _, ...userPayload } = user;

    const accessToken = await createToken(userPayload, "15m");

    const refreshToken = await createToken({ id: userPayload.id }, "7d");

    const cookieStore = await cookies();

    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 1,
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
      role: payload.role,
    };

    const newAccessToken = await createToken(userPayload, "15m");

    const newRefreshToken = await createToken({ id: userPayload.id }, "7d");

    cookieStore.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 1,
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
