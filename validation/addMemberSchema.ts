import z from "zod";

export const addMemberSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Member name must be at least 3 characters" })
    .max(50, { message: "Member name must be at most 50 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .max(20, { message: "Phone number must be at most 20 characters" }),
  id: z.string().optional(),
});
