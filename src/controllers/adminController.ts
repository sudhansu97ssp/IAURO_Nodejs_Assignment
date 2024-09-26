import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import * as adminService from "../services/adminService";
import { User } from "../model/userSchema";

/**
 * Deletes a user based on the provided user ID.
 * 
 * @param {Request} req - Express request object, containing user ID in `req.params.id`.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns a success message if the user is deleted, otherwise returns an error message.
 */
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await adminService.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Updates the role and name of a user based on the provided user ID and new details.
 * 
 * @param {Request} req - Express request object, containing user ID in `req.params.id` and user details (role, name) in `req.body`.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns a success message if the user details are updated, otherwise returns an error message.
 */
const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { role, name } = req.body;
  try {
    const updatedUser = await adminService.updateUser(
      req.params.id,
      role,
      name
    );
    res
      .status(200)
      .json({ message: "user details updated successfully", updatedUser });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export { deleteUser, updateUser };
