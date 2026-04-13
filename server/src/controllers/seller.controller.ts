import type { Request, Response } from "express";

import { UserModel as User } from "../models/user.model";

import { toUserDto } from "../dtos/user.dto";

// -------------------------------------------------------------

export async function registerSeller(req: Request, res: Response) {
  const user = await User.findByIdAndUpdate(
    req.userId,
    { is_registered_seller: true },
    { new: true },
  );

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(201).json(toUserDto(user));
}

// -------------------------------------------------------------

export async function unregisterSeller(req: Request, res: Response) {
  const user = await User.findByIdAndUpdate(
    req.userId,
    { is_registered_seller: false },
    { new: true },
  );

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(201).json(toUserDto(user));
}

// -------------------------------------------------------------

export async function getAllSeller(req: Request, res: Response) {
  try {
    const sellers = await User.find({ is_registered_seller: true });

    res.status(200).json(sellers.map(toUserDto));
  } catch {
    res.status(500).json({ message: "Failed to fetch sellers" });
  }
}
