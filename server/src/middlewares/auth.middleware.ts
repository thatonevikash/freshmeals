import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

// -------------------------------------------------------------

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1] as string;

  try {
    const decoded = verifyToken(token) as { userId: string };
    (req as any).userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
