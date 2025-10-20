import z from "zod";

export const subscriptionSchema = z.object({
  memberId: z.string().min(1, "Member is required"),
  sportIds: z.array(z.string().min(1)).min(1, "At least one sport is required"),
});
