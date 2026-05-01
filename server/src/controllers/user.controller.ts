import type { Request, Response } from "express";
import { UserModel as User } from "../models/user.model.js";

import { toUserDto } from "../dtos/user.dto.js";

// -------------------------------------------------------------

export async function getUser(req: Request, res: Response) {
  const user = await User.findById(req.userId);

  if (!user) {
    res.status(404).json({ message: "User not found!" });
    return;
  }

  res.status(200).json(toUserDto(user));
}

// -------------------------------------------------------------

export async function updateUser(req: Request, res: Response) {
  try {
    const { avatar_url, name, mobile_no, address, pincode } = req.body;

    const updates: Record<string, unknown> = {};
    if (avatar_url !== undefined) updates.avatar_url = avatar_url;
    if (name !== undefined) updates.name = name;
    if (mobile_no !== undefined) updates.mobile_no = mobile_no;
    if (address !== undefined) updates.address = address;
    if (pincode !== undefined) updates.pincode = pincode;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $set: updates },
      { new: true, runValidators: true },
    ).select("-createdAt -updatedAt");

    res.status(201).json(updatedUser);
    return;
  } catch (error) {
    res.status(500).json({ message: "Unable to update user!" });
    return;
  }
}
