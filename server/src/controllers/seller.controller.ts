import type { Request, Response } from "express";
import { UserModel as User } from "../models/user.model";

// -------------------------------------------------------------

export async function getAllSeller(req: Request, res: Response) {
  try {
    const sellers = await User.find({ is_registered_seller: true })
      .select("_id seller_information is_registered_seller")
      .lean();

    res.status(200).json({ data: sellers });
  } catch {
    res.status(500).json({ message: "Failed to fetch sellers" });
  }
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
