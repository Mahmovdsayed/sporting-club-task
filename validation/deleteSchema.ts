import z from "zod";

export const deleteSportSchema = z.object({
  id: z.string().min(1, { message: "Sport ID is required" }),
});
