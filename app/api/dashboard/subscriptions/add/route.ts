import { authenticateUser } from "@/helpers/helpers";
import { jsonResponse } from "@/helpers/jsonResponse";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Subscriptions from "@/models/Subscriptions.model";
import { isValidObjectId } from "mongoose";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { memberId, sportIds } = body;

    if (
      !memberId ||
      !sportIds ||
      !Array.isArray(sportIds) ||
      sportIds.length === 0
    )
      return jsonResponse(false, "Member and at least one sport are required");

    if (!isValidObjectId(memberId))
      return jsonResponse(false, "Invalid member ID");

    if (!sportIds.every((id) => isValidObjectId(id)))
      return jsonResponse(false, "Invalid sport IDs");

    await connectToDatabase();
    const user = await authenticateUser();
    if (!user) return jsonResponse(false, "Unauthorized");

    const createdSubscriptions: string[] = [];
    const skippedSubscriptions: string[] = [];

    for (const sportId of sportIds) {
      const existing = await Subscriptions.findOne({ memberId, sportId });

      if (existing) {
        skippedSubscriptions.push(sportId);
        continue;
      }

      const newSubscription = await Subscriptions.create({
        memberId,
        sportId,
        addBy: user.id,
      });

      createdSubscriptions.push(newSubscription._id.toString());
    }

    if (createdSubscriptions.length === 0)
      return jsonResponse(
        false,
        "All selected sports are already subscribed for this member"
      );

    return jsonResponse(true, "Subscription(s) added successfully", {
      createdCount: createdSubscriptions.length,
      skippedCount: skippedSubscriptions.length,
    });
  } catch (error: any) {
    console.error(error);
    return jsonResponse(false, "Internal server error");
  }
}
