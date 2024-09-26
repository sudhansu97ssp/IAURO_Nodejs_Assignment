import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../model/userSchema";
import * as authService from "../services/authService";

/**
 * Registers a new user by creating an account with a username, email, password, and role.
 * 
 * @param {Request} req - Express request object containing `username`, `email`, `password`, and `role` in `req.body`.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns a success message and the created user if registration is successful, otherwise an error message.
 */
const signUp = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, role } = req.body;
  try {
    const user = await authService.signup(username, email, password, role);
    res.status(201).json({ message: "User created successfully", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Authenticates a user by verifying their email and password, and generates a JWT token upon successful sign-in.
 * 
 * @param {Request} req - Express request object containing `email` and `password` in `req.body`.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns a success message along with a JWT token, expiration time, and user details if authentication is successful, otherwise an error message.
 */
const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const { token, user, expiresAt } = await authService.signin(
      email,
      password
    );
    res
      .status(200)
      .json({ message: "User signed in successfully", token, expiresAt, user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export { signUp, signIn };
