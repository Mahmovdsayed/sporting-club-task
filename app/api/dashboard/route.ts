import { authenticateUser } from "@/helpers/helpers";
import { jsonResponse } from "@/helpers/jsonResponse";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Member from "@/models/Member.model";
import Sports from "@/models/Sports.model";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user) return jsonResponse(false, "Unauthorized");

    const totalSports = await Sports.countDocuments({ userId: user.id });
    const totalMembers = await Member.countDocuments({ addBy: user.id });

    return jsonResponse(true, "Fetched successfully", {
      totalSports,
      totalMembers,
    });
  } catch (error) {
    return jsonResponse(false, "Something went wrong");
  }
}
