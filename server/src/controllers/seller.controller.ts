import type { Request, Response } from "express";
import { MealModel as Meal, type IMeal } from "../models/meal.model";
import { UserModel as User } from "../models/user.model";
import { PlateModel as Plate } from "../models/plate.model";

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
      return;
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

    res.status(201).json({ message: "meal created successfully!", data: meal });
  } catch (error) {
    res.status(500).json({ message: "Unable to create meal" });
    return;
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
    return;
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
    return;
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
      return;
    }

    res
      .status(200)
      .json({ message: "Meal updated successfully", data: updatedMeal });
  } catch (error) {
    res.status(500).json({ message: "Unable to update meal" });
    return;
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
      return;
    }

    res
      .status(200)
      .json({ message: "Meal deleted successfully", data: deletedMeal });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete meal" });
    return;
  }
}

// -------------------------------------------------------------

export async function createSellerPlate(req: Request, res: Response) {
  try {
    const { plate_name, plate_price, plate_img_url, plate_items } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user && !user.is_registered_seller) {
      res.status(401).json({ message: "User is not registered seller" });
      return;
    }

    console.log({ plate_name, plate_price, plate_img_url });

    if ([plate_name, plate_price, plate_img_url].some((f) => !f)) {
      res.status(400).json({ message: "All fields are required!" });
      return;
    }

    if (!plate_items || plate_items.length === 0) {
      res
        .status(400)
        .json({ message: "Plate items must contain at least one meal" });
      return;
    }

    const meals = await Meal.find({ _id: { $in: plate_items } }).select(
      "_id meal_name",
    );

    if (meals.length !== plate_items.length) {
      res.status(400).json({ message: "One or more meal IDs are invalid" });
      return;
    }

    const resolvedPlateItems = meals.map((meal) => ({
      meal_id: meal._id,
      meal_name: meal.meal_name,
    }));

    const plate = await Plate.create({
      plate_name,
      plate_price,
      plate_items: resolvedPlateItems,
      plate_img_url,
      seller_information: {
        seller_id: user.id,
        seller_name: user.username,
        seller_avatarUrl: user.avatar_url,
      },
    });

    res
      .status(201)
      .json({ message: "plate created successfully!", data: plate });
  } catch (error) {
    res.status(500).json({ message: "Unable to create plate" });
    return;
  }
}

// -------------------------------------------------------------

export async function getSellerPlates(req: Request, res: Response) {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const plates = await Plate.find({
      "seller_information.seller_id": user.id,
    });

    res.status(200).json({ data: plates });
  } catch (error) {
    res.status(400).json({ message: "Unable to fetch plates" });
    return;
  }
}

// -------------------------------------------------------------

export async function getSellerPlate(req: Request, res: Response) {
  try {
    const { plate_id } = req.params;

    const plate = await Plate.findById(plate_id);

    if (!plate) {
      res.status(404).json({ message: "Plate not found!" });
      return;
    }

    const isSeller =
      plate.seller_information.seller_id.toString() === req.userId;

    if (!isSeller) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    res.status(200).json({ data: plate });
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch meal" });
    return;
  }
}

// -------------------------------------------------------------

export async function updateSellerPlate(req: Request, res: Response) {
  try {
    const { plate_id } = req.params;
    const { plate_name, plate_price, plate_img_url } = req.body;
    const updates = { plate_name, plate_price, plate_img_url };

    const plate = await Plate.findById(plate_id);

    if (!plate) {
      res.status(404).json({ message: "Plate not found!" });
      return;
    }

    const isSeller =
      plate.seller_information.seller_id.toString() === req.userId;

    if (!isSeller) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const updatedPlate = await Meal.findByIdAndUpdate(plate_id, updates, {
      new: true,
    });

    if (!updatedPlate) {
      res.status(404).json({ message: "Plate not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Meal updated successfully", data: updatedPlate });
  } catch (error) {
    res.status(500).json({ message: "Unable to update meal" });
    return;
  }
}

// -------------------------------------------------------------

export async function deleteSellerPlate(req: Request, res: Response) {
  try {
    const { plate_id } = req.params;

    const plate = await Meal.findById(plate_id);

    if (!plate) {
      res.status(404).json({ message: "Plate not found!" });
      return;
    }

    const isSeller =
      plate.seller_information.seller_id.toString() === req.userId;

    if (!isSeller) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const deletedPlate = await Meal.findByIdAndDelete(plate_id);

    if (!deletedPlate) {
      res.status(404).json({ message: "Plate not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Meal deleted successfully", data: deletedPlate });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete plate" });
    return;
  }
}

// -------------------------------------------------------------

export async function addSellerPlateItem(req: Request, res: Response) {
  try {
    const { plate_id, meal_id } = req.params;

    const plate = await Plate.findById(plate_id);

    if (!plate) {
      res.status(404).json({ message: "Plate not found" });
      return;
    }

    const isPlateSeller =
      plate.seller_information.seller_id.toString() === req.userId;

    if (!isPlateSeller) {
      res.status(403).json({ message: "Can not modify this plate" });
      return;
    }

    const meal = await Meal.findById(meal_id);

    if (!meal) {
      res.status(404).json({ message: "Meal not found" });
      return;
    }

    const isMealSeller =
      meal.seller_information.seller_id.toString() === req.userId;

    if (!isMealSeller) {
      res.status(403).json({ message: "Can add only your meals" });
      return;
    }

    const resolvedPlateItem = { meal_id: meal._id, meal_name: meal.meal_name };

    const updatedPlate = await Plate.findByIdAndUpdate(
      plate_id,
      { $addToSet: { plate_items: { $each: [resolvedPlateItem] } } },
      { new: true },
    );

    if (!updatedPlate) {
      res.status(400).json({ message: "Plate updation failed" });
      return;
    }

    res.status(201).json({ message: "Plate item added", data: updatedPlate });
  } catch (error) {
    res.status(500).json({ message: "Unable to add item in plate" });
    return;
  }
}

// -------------------------------------------------------------

export async function removeSellerPlateItem(req: Request, res: Response) {
  try {
    const { plate_id, meal_id } = req.params;

    const plate = await Plate.findById(plate_id);

    if (!plate) {
      res.status(404).json({ message: "Plate not found" });
      return;
    }

    const isPlateSeller =
      plate.seller_information.seller_id.toString() === req.userId;

    if (!isPlateSeller) {
      res.status(403).json({ message: "Can not modify this plate" });
      return;
    }

    const meal = await Meal.findById(meal_id);

    if (!meal) {
      res.status(404).json({ message: "Meal not found" });
      return;
    }

    const resolvedPlateItem = { meal_id: meal._id, meal_name: meal.meal_name };

    const updatedPlate = await Plate.findByIdAndUpdate(
      plate_id,
      { $pull: { plate_items: resolvedPlateItem } },
      { new: true },
    );

    if (!updatedPlate) {
      res.status(400).json({ message: "Plate updation failed" });
      return;
    }

    res.status(201).json({ message: "Plate item removed", data: updatedPlate });
  } catch (error) {
    res.status(500).json({ message: "Unable to add item in plate" });
    return;
  }
}

// -------------------------------------------------------------

export async function getSellerCollection(req: Request, res: Response) {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const meals = await Meal.find({ "seller_information.seller_id": user.id });

    if (!meals) {
      res.status(400).json({ message: "Unable to fetch meals" });
      return;
    }

    const plates = await Plate.find({
      "seller_information.seller_id": user.id,
    });

    if (!plates) {
      res.status(400).json({ message: "Unable to fetch plates" });
      return;
    }

    res
      .status(200)
      .json({ message: "Seller collection fetched", data: { meals, plates } });
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch seller collection" });
    return;
  }
}
