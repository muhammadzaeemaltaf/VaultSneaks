import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password, keepSignedIn } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const query = `*[_type == "user" && email == $email][0]`;
    const user = await client.fetch(query, { email });

    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    if (password !== user.password) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const response = NextResponse.json(user);

    if (keepSignedIn) {
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.NODE_ENV, { expiresIn: "7d" });
      response.cookies.set({
        name: "vaultSneak_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60, 
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
