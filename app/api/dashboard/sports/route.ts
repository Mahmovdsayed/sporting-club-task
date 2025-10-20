import { authenticateUser } from "@/helpers/helpers";
import { jsonResponse } from "@/helpers/jsonResponse";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Sports from "@/models/Sports.model";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user) return jsonResponse(false, "Unauthorized");

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 6;
    const skip = (page - 1) * limit;

    const sports = await Sports.find({ userId: user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalSports = await Sports.countDocuments({ userId: user.id });

    return jsonResponse(true, "Sports fetched successfully", {
      sports,
      totalSports,
    });
  } catch (error) {
    return jsonResponse(false, "Internal Server Error");
  }
}
