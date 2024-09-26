import { User } from "../model/userSchema";

export const deleteUser = async (userId: string) => {
  return await User.findByIdAndDelete(userId);
};

export const updateUser = async (
  userId: string,
  role?: string,
  name?: string
) => {
  if (role === "admin") {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin && existingAdmin._id.toString() !== userId) {
      return {
        error:
          "There is already an admin in the system. Only one admin is allowed.",
      };
    }
  }
  return await User.findByIdAndUpdate(userId, { role, name }, { new: true });
};
