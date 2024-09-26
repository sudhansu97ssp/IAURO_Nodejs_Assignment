import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JwtPayloadCustom } from "../types/express";
dotenv.config();

/**
 * Middleware function to authenticate a user by verifying their JWT token.
 * 
 * @param {Request} req - Express request object containing the token in the `authorization` header.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express `next` function to pass control to the next middleware.
 * @returns {void} - If the token is valid, the user is authenticated, and control is passed to the next middleware, otherwise an error response is sent.
 */
export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res.status(403).send("error: token required for authentication");

  Jwt.verify(token, process.env.JWT_SECRET || "", (err, decoded) => {
    if (err) return res.status(401).send({ message: "Invalid token" });

    if (
      decoded &&
      typeof decoded === "object" &&
      "id" in decoded &&
      "role" in decoded
    ) {
      req.user = decoded as JwtPayloadCustom;
      next();
    } else {
      return res.status(401).send({ message: "Invalid token payload" });
    }
  });
};

/**
 * Middleware function to authorize a user based on their role.
 * 
 * @param {Request} req - Express request object containing the user information in `req.user`.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express `next` function to pass control to the next middleware.
 * @returns {void} - If the user is an admin, control is passed to the next middleware, otherwise an access denied message is sent.
 */
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).send("Access denied. Only admins can perform this action.");
  }
};
