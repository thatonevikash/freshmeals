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

// -------------------------------------------------------------

export async function registerSeller(req: Request, res: Response) {
  const seller = await User.findByIdAndUpdate(
    req.userId,
    { is_registered_seller: true },
    { new: true },
  ).select("-password");

  if (!seller) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json({ message: "Seller registered", data: seller });
}

// -------------------------------------------------------------

export async function unregisterSeller(req: Request, res: Response) {
  const seller = await User.findByIdAndUpdate(
    req.userId,
    { is_registered_seller: false },
    { new: true },
  ).select("-password");

  if (!seller) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json({ message: "Seller unregistered", data: seller });
}
