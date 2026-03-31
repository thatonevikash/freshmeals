import type { Request, Response } from "express";
import { UserModel as User } from "../models/user.model";

// -------------------------------------------------------------

export async function getAllSeller(req: Request, res: Response) {
  const sellers = await User.find({ is_registered_seller: true });

  if (!sellers) {
    res.status(400).json({ message: "Failed to fetch sellers" });
    return;
  }

  res.status(200).json({ data: sellers });
}

// -------------------------------------------------------------

export async function createSellerMeal(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function getSellerMeals(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function createSellerPlate(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function getSellerPlates(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function getSellerCollection(req: Request, res: Response) {}
