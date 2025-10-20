import { authenticateUser } from "@/helpers/helpers";
import { jsonResponse } from "@/helpers/jsonResponse";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Member from "@/models/Member.model";
import { addMemberSchema } from "@/validation/addMemberSchema";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, name, phone, email } = body;

    if (!id) return jsonResponse(false, "Id is required");
    if (!isValidObjectId(id)) return jsonResponse(false, "Invalid Id");

    const parsed = addMemberSchema.safeParse({ id, name, phone, email });
    if (!parsed.success)
      return jsonResponse(false, parsed.error.issues[0].message);

    await connectToDatabase();
    const user = await authenticateUser();
    if (!user) return jsonResponse(false, "Unauthorized");

    const memberToUpdate = await Member.findById(id);
    if (!memberToUpdate) return jsonResponse(false, "Member not found");

    if (memberToUpdate.addBy.toString() !== user.id.toString())
      return jsonResponse(
        false,
        "You are not authorized to update this member"
      );

    const existingMember = await Member.findOne({
      email,
      addBy: user.id,
      _id: { $ne: id },
    });

    if (existingMember)
      return jsonResponse(false, "Member with this email already exists");

    await Member.updateOne({ _id: id }, { name, phone, email });
    revalidateTag("members-dashboard");
    return jsonResponse(true, "Member updated successfully");
  } catch (error) {
    return jsonResponse(false, "An error occurred");
  }
}
