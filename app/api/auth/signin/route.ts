import { setAuthCookie } from "@/helpers/auth";
import { verifyPassword } from "@/helpers/helpers";
import { jsonResponse } from "@/helpers/jsonResponse";
import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User.model";
import { loginSchema } from "@/validation/signInSchema";

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
    if (!isPasswordValid)
      return jsonResponse(false, "Invalid email or password");

    await setAuthCookie(user);
    return jsonResponse(true, "Logged in successfully");
  } catch (error) {
    console.log(error);
    return jsonResponse(false, "Internal server error");
  }
}
