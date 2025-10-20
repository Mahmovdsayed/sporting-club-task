import { authenticateUser } from "@/helpers/helpers";
import { jsonResponse } from "@/helpers/jsonResponse";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Sports from "@/models/Sports.model";
import { addSportSchema } from "@/validation/addSportSchema";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description } = body;

    const parsed = addSportSchema.safeParse({ name, description });

    if (!parsed.success)
      return jsonResponse(false, parsed.error.issues[0].message);

    await connectToDatabase();
    const user = await authenticateUser();
    if (!user) return jsonResponse(false, "Unauthorized");

    const sport = await Sports.findOne({ name, userId: user.id });
    if (sport)
      return jsonResponse(false, "Sport with this name already exists");

    await Sports.create({ name, description, userId: user.id });
    revalidateTag("sports-dashboard");
    return jsonResponse(true, "Sport added successfully");
  } catch (error) {
    return jsonResponse(false, "Internal Server Error");
  }
}
