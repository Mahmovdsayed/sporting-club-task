import { authenticateUser } from "@/helpers/helpers";
import { jsonResponse } from "@/helpers/jsonResponse";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Sports from "@/models/Sports.model";
import { addSportSchema } from "@/validation/addSportSchema";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, name, description } = body;

    if (!id) return jsonResponse(false, "Id is required");
    if (!isValidObjectId(id)) return jsonResponse(false, "Invalid Id");

    const parsed = addSportSchema.safeParse({ name, description });
    if (!parsed.success)
      return jsonResponse(false, parsed.error.issues[0].message);

    await connectToDatabase();
    const user = await authenticateUser();
    if (!user) return jsonResponse(false, "Unauthorized");

    const existingSport = await Sports.findById(id);
    if (!existingSport) return jsonResponse(false, "Sport not found");

    if (existingSport.userId.toString() !== user.id.toString())
      return jsonResponse(false, "You are not authorized to update this sport");

    const duplicateSport = await Sports.findOne({
      name,
      userId: user.id,
      _id: { $ne: id },
    });

    if (duplicateSport)
      return jsonResponse(false, "Sport with this name already exists");

    await Sports.updateOne({ _id: id }, { name, description });
    revalidateTag("sports-dashboard");
    return jsonResponse(true, "Sport updated successfully");
  } catch (error) {
    console.error(error);
    return jsonResponse(false, "An error occurred");
  }
}
