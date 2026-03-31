import type { Request, Response } from "express";
import { MealModel as Meal } from "../models/meal.model";
import { UserModel as User } from "../models/user.model";
import mongoose from "mongoose";

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
// -------------------------------------------------------------

export async function createSellerMeal(req: Request, res: Response) {
  try {
    const { meal_name, meal_price, meal_img_url } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user && !user.is_registered_seller) {
      res.status(401).json({ message: "User is not registered seller" });
    }

    if ([meal_name, meal_price, meal_img_url].some((f) => !f)) {
      res.status(400).json({ message: "All fields are required!" });
      return;
    }

    const meal = await Meal.create({
      meal_name,
      meal_price,
      meal_img_url,
      seller_information: {
        seller_id: user.id,
        seller_name: user.username,
        seller_avatarUrl: user.avatar_url,
      },
    });

    await meal.save();

    if (!meal) {
      throw new Error("unable to create meal!");
    }

    res.status(201).json({ message: "meal created successfully!", data: meal });
  } catch (error) {
    res.status(500).json({ message: "Unable to create meal" });
    throw error;
  }
}

// -------------------------------------------------------------

export async function getSellerMeals(req: Request, res: Response) {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const meals = await Meal.find({ "seller_information.seller_id": user.id });

    res.status(200).json({ data: meals });
  } catch (error) {
    res.status(400).json({ message: "Unable to fetch meals" });
    throw error;
  }
}

// -------------------------------------------------------------

export async function getSellerMeal(req: Request, res: Response) {
  try {
    const { meal_id } = req.params;

    const meal = await Meal.findById(meal_id);

    if (!meal) {
      res.status(404).json({ message: "Meal not found!" });
      return;
    }

    const isSeller =
      meal.seller_information.seller_id.toString() === req.userId;

    if (!isSeller) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    res.status(200).json({ data: meal });
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch meal" });
    throw error;
  }
}

// -------------------------------------------------------------

export async function updateSellerMeal(req: Request, res: Response) {
  try {
    const { meal_id } = req.params;
    const { meal_name, meal_price, meal_img_url } = req.body;
    const updates = { meal_name, meal_price, meal_img_url };

    const meal = await Meal.findById(meal_id);

    if (!meal) {
      res.status(404).json({ message: "Meal not found!" });
      return;
    }

    const isSeller =
      meal.seller_information.seller_id.toString() === req.userId;

    if (!isSeller) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const updatedMeal = await Meal.findByIdAndUpdate(meal_id, updates, {
      new: true,
    });

    if (!updatedMeal) {
      res.status(404).json({ message: "Meal not found" });
    }

    res
      .status(200)
      .json({ message: "Meal updated successfully", data: updatedMeal });
  } catch (error) {
    res.status(500).json({ message: "Unable to update meal" });
    throw error;
  }
}

// -------------------------------------------------------------

export async function deleteSellerMeal(req: Request, res: Response) {
  try {
    const { meal_id } = req.params;

    const meal = await Meal.findById(meal_id);

    if (!meal) {
      res.status(404).json({ message: "Meal not found!" });
      return;
    }

    const isSeller =
      meal.seller_information.seller_id.toString() === req.userId;

    if (!isSeller) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const deletedMeal = await Meal.findByIdAndDelete(meal_id);

    if (!deletedMeal) {
      res.status(404).json({ message: "Meal not found" });
    }

    res
      .status(200)
      .json({ message: "Meal deleted successfully", data: deletedMeal });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete meal" });
    throw error;
  }
}

// -------------------------------------------------------------

export async function createSellerPlate(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function getSellerPlates(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function getSellerCollection(req: Request, res: Response) {}
