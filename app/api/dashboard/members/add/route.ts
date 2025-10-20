import { authenticateUser } from "@/helpers/helpers";
import { jsonResponse } from "@/helpers/jsonResponse";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Member from "@/models/Member.model";
import { addMemberSchema } from "@/validation/addMemberSchema";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email } = body;

    const parsed = addMemberSchema.safeParse({ name, phone, email });
    if (!parsed.success)
      return jsonResponse(false, parsed.error.issues[0].message);

    await connectToDatabase();
    const user = await authenticateUser();
    if (!user) return jsonResponse(false, "Unauthorized");

    const member = await Member.findOne({ email, addBy: user.id });
    if (member)
      return jsonResponse(false, "Member with this email already exists");

    await Member.create({ name, phone, email, addBy: user.id });
    revalidateTag("members-dashboard")
    return jsonResponse(true, "Member added successfully");
  } catch (error) {
    return jsonResponse(false, "Internal Server Error");
  }
}
