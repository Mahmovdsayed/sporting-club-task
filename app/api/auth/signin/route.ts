import { setAuthCookie } from "@/helpers/auth";
import { verifyPassword } from "@/helpers/helpers";
import { jsonResponse } from "@/helpers/jsonResponse";
import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User.model";
import { loginSchema } from "@/validation/signInSchema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const parsed = loginSchema.safeParse({ email, password });

    if (!parsed.success) {
      return jsonResponse(false, parsed.error.issues[0].message);
    }
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) return jsonResponse(false, "Invalid email or password");

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) return jsonResponse(false, "Invalid email or password");

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "",
      {
        expiresIn: "7d",
      }
    );

    (await cookies()).set("userToken", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    await setAuthCookie(user);
    return jsonResponse(true, "Logged in successfully");
  } catch (error) {
    console.log(error);
    return jsonResponse(false, "Internal server error");
  }
}
