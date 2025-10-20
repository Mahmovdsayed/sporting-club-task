import { authenticateUser } from "@/helpers/helpers";
import { jsonResponse } from "@/helpers/jsonResponse";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Sports from "@/models/Sports.model";
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

    const sport = await Sports.findById(id);
    if (!sport) return jsonResponse(false, "Sport not found");

    if (sport.userId.toString() !== user.id.toString())
      return jsonResponse(false, "You are not authorized to delete this sport");

    await Sports.deleteOne({ _id: id });
    revalidateTag("sports-dashboard");
    return jsonResponse(true, "Sport deleted successfully");
  } catch (error) {
    return jsonResponse(false, "Internal Server Error");
  }
}
