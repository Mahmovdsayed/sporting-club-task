import { authenticateUser } from "@/helpers/helpers";
import { jsonResponse } from "@/helpers/jsonResponse";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Subscriptions from "@/models/Subscriptions.model";
import { isValidObjectId } from "mongoose";

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user) return jsonResponse(false, "Unauthorized");

    const { searchParams } = new URL(req.url);
    const memberId = searchParams.get("memberId");

    if (!memberId) return jsonResponse(false, "Member ID is required");
    if (!isValidObjectId(memberId))
      return jsonResponse(false, "Invalid Member ID");

    const deleted = await Subscriptions.deleteMany({
      memberId,
      addBy: user.id,
    });

    if (deleted.deletedCount === 0)
      return jsonResponse(false, "No subscriptions found for this member");

    return jsonResponse(true, "All subscriptions for this member deleted successfully");
  } catch (error) {
    console.error("DELETE error:", error);
    return jsonResponse(false, "Internal server error");
  }
}
