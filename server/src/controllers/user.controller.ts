import type { Request, Response } from "express";
import { UserModel as User } from "../models/user.model";

// -------------------------------------------------------------

export async function getUser(req: Request, res: Response) {
  const user = await User.findById(req.userId).select("-password");

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json({ message: "User fetched successfully!", data: user });
}

// -------------------------------------------------------------

export async function updateUser(req: Request, res: Response) {}
