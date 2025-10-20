import { authenticateUser } from "@/helpers/helpers";
import { jsonResponse } from "@/helpers/jsonResponse";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Subscriptions from "@/models/Subscriptions.model";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user) return jsonResponse(false, "Unauthorized");

    const subs = await Subscriptions.aggregate([
      {
        $match: {
          addBy: new mongoose.Types.ObjectId(user.id),
        },
      },
      {
        $lookup: {
          from: "members",
          localField: "memberId",
          foreignField: "_id",
          as: "member",
        },
      },
      { $unwind: "$member" },
      {
        $lookup: {
          from: "sports",
          localField: "sportId",
          foreignField: "_id",
          as: "sport",
        },
      },
      { $unwind: "$sport" },
      {
        $group: {
          _id: "$member._id",
          memberName: { $first: "$member.name" },
          sports: { $push: { id: "$sport._id", name: "$sport.name" } },
        },
      },
      { $sort: { memberName: 1 } },
    ]);

    return jsonResponse(true, "Fetched successfully", {
      members: subs,
    });
  } catch (error) {
    return jsonResponse(false, "Internal server error");
  }
}
