import { authenticateUser } from "@/helpers/helpers";
import { jsonResponse } from "@/helpers/jsonResponse";
import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User.model";

export async function GET() {
  try {
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user) return jsonResponse(false, "Unauthorized");

    const getUser = await User.findOne({ _id: user.id }).select("-password");
    if (!getUser) return jsonResponse(false, "User not found");

    return jsonResponse(true, "User fetched successfully", getUser);
  } catch (error) {
    return jsonResponse(false, "Internal server error");
  }
}
