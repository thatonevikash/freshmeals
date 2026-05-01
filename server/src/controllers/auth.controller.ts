import type { Request, Response } from "express";
import { UserModel as User } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";

// -------------------------------------------------------------

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and Password are required!" });
    return;
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    res.status(401).json({ message: "Either email or password is wrong!" });
    return;
  }

  const token = generateToken(user._id.toString());

  res.status(200).json({ token });
  return;
}

// -------------------------------------------------------------

export async function signup(req: Request, res: Response) {
  try {
    const { name, password, email, mobile_no, address, pincode } = req.body;

    if ([name, password, email].some((f) => !f)) {
      res.status(400).json({ message: "All fields are required!" });
      return;
    }

    const existing = await User.findOne({ email });
    if (existing) {
      res.status(409).json({ message: "User already exist with this email!" });
      return;
    }

    const newUser = await User.create({
      name,
      password,
      email,
      mobile_no,
      address,
      pincode,
    });

    const user = await User.findById(newUser._id).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    res.status(201).json(user);
    return;
  } catch (error) {
    res.status(500).json({ message: "Unable to create user!" });
    return;
  }
}
