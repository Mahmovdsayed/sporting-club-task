"use server";

import User from "@/models/User.model";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { clearAuthCookie, getDecodedToken } from "./auth";
import { connectToDatabase } from "@/lib/connectToDatabase";

export const hashPassword = async (password: string) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS || "");
  return await bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};
export const authenticateUser = async () => {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const decoded = await getDecodedToken();
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    await clearAuthCookie();
    return null;
  }
};

export const authorizeUser = async () => {
  try {
    await connectToDatabase();
    const user = await authenticateUser();

    if (!user?.id)
      return { success: false, message: "Unauthorized: Invalid user" };
    const existingUser = await User.findById(user.id);

    if (!existingUser)
      return { success: false, message: "Unauthorized: User not found" };

    if (existingUser._id.toString() !== user.id)
      return { success: false, message: "Unauthorized: Token mismatch" };

    return { success: true, user: existingUser };
  } catch (error) {
    return { success: false, message: "Unauthorized: Something went wrong" };
  }
};
