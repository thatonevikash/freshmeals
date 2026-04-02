import type { Request, Response } from "express";
import { UserModel as User } from "../models/user.model";

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

// -------------------------------------------------------------

export async function getAllSeller(req: Request, res: Response) {
  try {
    const sellers = await User.find({ is_registered_seller: true }).select(
      "id username avatar_url is_registered_seller",
    );

    res.status(200).json({ data: sellers });
  } catch {
    res.status(500).json({ message: "Failed to fetch sellers" });
  }
}
