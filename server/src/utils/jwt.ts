import jwt from "jsonwebtoken";
import { ENV } from "../configs/env-variables.js";

// -------------------------------------------------------------

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn: "14d" });
}

// -------------------------------------------------------------

export function verifyToken(token: string) {
  return jwt.verify(token, ENV.JWT_SECRET);
}
