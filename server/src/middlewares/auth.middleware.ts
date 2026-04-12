import { Types } from "mongoose";
import type { Request, Response, NextFunction } from "express";

import { verifyToken } from "../utils/jwt";

import { UserModel as User } from "../models/user.model";

// -------------------------------------------------------------

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const headers = req.headers.authorization;

  if (!headers?.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = headers.split(" ")[1] as string;

  try {
    const decoded = verifyToken(token) as { userId: string };
    req.userId = new Types.ObjectId(decoded.userId);
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

// -------------------------------------------------------------

export async function isAuthorizedSeller(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user = await User.findById(req.userId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const isAuthorized = user.is_registered_seller;

  if (!isAuthorized) {
    res.status(403).json({ message: "User is not authorized seller" });
    return;
  }

  next();
}
