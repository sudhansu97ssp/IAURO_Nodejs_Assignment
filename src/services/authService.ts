import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../model/userSchema";
dotenv.config();

export const signup = async (
  username: string,
  email: string,
  password: string,
  role?: string
) => {
  if (role === "admin") {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      throw new Error("Admin already exists. Only one admin is allowed.");
    }
  }
  const hashedPassword = await bcrypt.hash(password, 15);
  const user = new User({
    name: username,
    email,
    password: hashedPassword,
    role,
  });
  await user.save();
  return user;
};

export const signin = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isUser = await bcrypt.compare(password, user.password);
  if (!isUser) throw new Error("Please enter valid username or password");
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "",
    { expiresIn: "1h" }
  );
  const expirationTime = new Date(Date.now() + 2 * 60 * 60 * 1000);
  return { token, user, expiresAt: expirationTime.toISOString() };
};
