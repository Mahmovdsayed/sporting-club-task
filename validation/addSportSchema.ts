import z from "zod";
import { id } from "zod/v4/locales";

export const addSportSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Sport name must be at least 3 characters" })
    .max(50, { message: "Sport name must be at most 50 characters" }),
  description: z
    .string()
    .min(3, { message: "Sport description must be at least 3 characters" })
    .max(50, { message: "Sport description must be at most 50 characters" }),
  id: z.string().optional(),
});
