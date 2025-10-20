import { authenticateUser } from "@/helpers/helpers";
import { jsonResponse } from "@/helpers/jsonResponse";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Member from "@/models/Member.model";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user) return jsonResponse(false, "Unauthorized");

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return jsonResponse(false, "Id is required");
    if (!isValidObjectId(id)) return jsonResponse(false, "Invalid Id");

    const member = await Member.findById(id);
    if (!member) return jsonResponse(false, "Member not found");

    if (member.addBy.toString() !== user.id.toString())
      return jsonResponse(
        false,
        "You are not authorized to delete this member"
      );

    await Member.deleteOne({ _id: id });
    revalidateTag("members-dashboard");
    return jsonResponse(true, "Member deleted successfully");
  } catch (error) {
    return jsonResponse(false, "Internal Server Error");
  }
}
