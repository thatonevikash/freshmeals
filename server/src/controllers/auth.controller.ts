import type { Request, Response } from "express";
import { UserModel as User } from "../models/user.model";
import { generateToken } from "../utils/jwt";

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
    res.status(401).json({ message: "Un-authorized" });
    return;
  }

  const token = generateToken(user.id.toString());

  res.status(200).json({
    message: "login successfully!",
    token,
  });
}

// -------------------------------------------------------------

export async function signup(req: Request, res: Response) {
  try {
    const { username, password, email, mobile_no, address, pincode } = req.body;

    if ([username, password, email].some((f) => !f)) {
      res.status(400).json({ message: "All fields are required!" });
      return;
    }

    const existing = await User.findOne({ email });
    if (existing) {
      res.status(409).json({ message: "User exist with email" });
      return;
    }

    const user = await User.create({
      username,
      password,
      email,
      mobile_no,
      address,
      pincode,
    });

    res.status(201).json({
      message: "user created successfully",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        address: user.address,
        mobile_no: user.mobile_no,
        pincode: user.pincode,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "unable to create user!" });
    return;
  }
}
