import { hashPassword } from "@/helpers/helpers";
import { jsonResponse } from "@/helpers/jsonResponse";
import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User.model";
import { signUpSchema } from "@/validation/signUpSchema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, password } = body;

    const parsed = signUpSchema.safeParse({
      fullName,
      email,
      password,
    });

    if (!parsed.success) {
      return jsonResponse(false, parsed.error.issues[0].message);
    }
    const {
      fullName: parsedFullName,
      email: parsedEmail,
      password: parsedPassword,
    } = parsed.data;

    await connectToDatabase();

    const existingUser = await User.findOne({ email: parsedEmail });

    if (existingUser) {
      return jsonResponse(false, "Email is already registered");
    }

    const hashedPassword = await hashPassword(parsedPassword);
    let imageUrl =
      "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713493679/sqlpxs561zd9oretxkki.jpg";

    const user = await User.create({
      fullName: parsedFullName,
      email: parsedEmail,
      password: hashedPassword,
      imageUrl,
    });

    return jsonResponse(true, "User created successfully");
  } catch (error) {
    return jsonResponse(false, "Internal server error");
  }
}
