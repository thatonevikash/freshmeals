import type { Request, Response } from "express";

import { MealModel as Meal } from "../models/meal.model";
import { PlateModel as Plate } from "../models/plate.model";

// -------------------------------------------------------------

// meal controllers
// -------------------------------------------------------------

export async function createMeal(req: Request, res: Response) {
  try {
    const { meal_name, meal_price, meal_img_url } = req.body;

    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized: No User ID found" });
      return;
    }

    if ([meal_name, meal_price, meal_img_url].some((f) => !f)) {
      res.status(400).json({ message: "All fields are required!" });
      return;
    }

    const newMeal = await Meal.create({
      meal_name,
      meal_price,
      meal_img_url,
      seller_information: {
        seller: req.userId,
      },
    });

    const meal = await Meal.findById(newMeal.id).populate({
      path: "seller_information.seller",
      model: "user",
      select: "id name avatar_url",
    });

    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ message: "Unable to create meal" });
    return;
  }
}

// -------------------------------------------------------------

export async function getMeals(req: Request, res: Response) {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized: No User ID found" });
      return;
    }

    const meals = await Meal.find({
      "seller_information.seller": req.userId,
    })
      .populate({
        path: "seller_information.seller",
        model: "user",
        select: "id name avatar_url",
      })
      .sort({ createdAt: "desc" })
      .select("-createdAt -updatedAt");

    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch meals" });
    return;
  }
}

// -------------------------------------------------------------

export async function getMeal(req: Request, res: Response) {
  try {
    const { meal_id } = req.params;

    const meal = await Meal.findById(meal_id).populate({
      path: "seller_information.seller",
      model: "user",
      select: "id name avatar_url",
    });

    if (!meal) {
      res.status(404).json({ message: "Meal not found!" });
      return;
    }

    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch meal" });
    return;
  }
}

// -------------------------------------------------------------

export async function updateMeal(req: Request, res: Response) {
  try {
    const { meal_id } = req.params;
    const { meal_name, meal_price, meal_img_url } = req.body;

    const updates = { meal_name, meal_price, meal_img_url };

    const meal = await Meal.findById(meal_id);

    if (!meal) {
      res.status(404).json({ message: "Meal not found!" });
      return;
    }

    const updatedMeal = await Meal.findByIdAndUpdate(meal_id, updates, {
      new: true,
    });

    if (!updatedMeal) {
      res.status(404).json({ message: "Meal not found" });
      return;
    }

    if (meal_name && meal_name !== meal.meal_name) {
      await Plate.updateMany(
        { "plate_items.meal_id": meal.id },
        { $set: { "plate_items.$[item].meal_name": updatedMeal.meal_name } },
        { arrayFilters: [{ "item.meal_id": meal.id }] },
      );
    }

    res.status(200).json(updatedMeal);
  } catch (error) {
    res.status(500).json({ message: "Unable to update meal" });
    return;
  }
}

// -------------------------------------------------------------

export async function deleteMeal(req: Request, res: Response) {
  try {
    const { meal_id } = req.params;

    const meal = await Meal.findById(meal_id);

    if (!meal) {
      res.status(404).json({ message: "Meal not found!" });
      return;
    }

    await Plate.updateMany(
      { "plate_items.meal_id": meal.id },
      { $pull: { plate_items: { meal_id: meal.id } } },
    );

    const deletedMeal = await Meal.findByIdAndDelete(meal_id);

    if (!deletedMeal) {
      res.status(404).json({ message: "Meal not found" });
      return;
    }

    res.status(200).json(deletedMeal);
  } catch (error) {
    res.status(500).json({ message: "Unable to delete meal" });
    return;
  }
}

// -------------------------------------------------------------

// plate controllers
// -------------------------------------------------------------

export async function createMealPlate(req: Request, res: Response) {
  try {
    const { plate_name, plate_price, plate_img_url, plate_items } = req.body;

    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized: No User ID found" });
      return;
    }

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

    const meals = await Meal.find({
      _id: { $in: plate_items },
      "seller_information.seller": req.userId,
    }).select("_id");

    if (meals.length !== plate_items.length) {
      res.status(400).json({ message: "One or more meal IDs are invalid" });
      return;
    }

    const resolvedPlateItems = meals.map((meal) => meal.id);

    const newPlate = await Plate.create({
      plate_name,
      plate_price,
      plate_items: resolvedPlateItems,
      plate_img_url,
      seller_information: {
        seller: req.userId,
      },
    });

    const plate = await Plate.findById(newPlate.id)
      .populate({
        path: "seller_information.seller",
        model: "user",
        select: "id name avatar_url",
      })
      .populate({
        path: "plate_items",
        model: "meal",
        select: "id meal_name meal_img_url",
      });

    if (!plate) {
      res.status(404).json({ message: "Plate not found!" });
      return;
    }

    res.status(201).json(plate);
  } catch (error) {
    res.status(500).json({ message: "Unable to create plate" });
    return;
  }
}

// -------------------------------------------------------------

export async function getMealPlates(req: Request, res: Response) {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized: No User ID found" });
      return;
    }

    const plates = await Plate.find({
      "seller_information.seller": req.userId,
    })
      .populate({
        path: "seller_information.seller",
        model: "user",
        select: "id name avatar_url",
      })
      .populate({
        path: "plate_items",
        model: "meal",
        select: "id meal_name meal_img_url",
      });

    res.status(200).json(plates);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch plates" });
    return;
  }
}

// -------------------------------------------------------------

export async function getMealPlate(req: Request, res: Response) {
  try {
    const { plate_id } = req.params;

    const plate = await Plate.findById(plate_id)
      .populate({
        path: "seller_information.seller",
        model: "user",
        select: "id name avatar_url",
      })
      .populate({
        path: "plate_items",
        model: "meal",
        select: "id meal_name meal_img_url",
      });

    if (!plate) {
      res.status(404).json({ message: "Plate not found!" });
      return;
    }

    res.status(200).json(plate);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch plate" });
    return;
  }
}

// -------------------------------------------------------------

export async function updateMealPlate(req: Request, res: Response) {
  try {
    const { plate_id } = req.params;
    const { plate_name, plate_price, plate_img_url } = req.body;

    const updates = { plate_name, plate_price, plate_img_url };

    const plate = await Plate.findById(plate_id);

    if (!plate) {
      res.status(404).json({ message: "Plate not found!" });
      return;
    }

    const updatedPlate = await Plate.findByIdAndUpdate(plate_id, updates, {
      new: true,
    })
      .populate({
        path: "seller_information.seller",
        model: "user",
        select: "id name avatar_url",
      })
      .populate({
        path: "plate_items",
        model: "meal",
        select: "id meal_name meal_img_url",
      });

    if (!updatedPlate) {
      res.status(404).json({ message: "Plate not found" });
      return;
    }

    res.status(200).json(updatedPlate);
  } catch (error) {
    res.status(500).json({ message: "Unable to update plate" });
    return;
  }
}

// -------------------------------------------------------------

export async function deleteMealPlate(req: Request, res: Response) {
  try {
    const { plate_id } = req.params;

    const plate = await Plate.findById(plate_id);

    if (!plate) {
      res.status(404).json({ message: "Plate not found!" });
      return;
    }

    const deletedPlate = await Plate.findByIdAndDelete(plate_id)
      .populate({
        path: "seller_information.seller",
        model: "user",
        select: "id name avatar_url",
      })
      .populate({
        path: "plate_items",
        model: "meal",
        select: "id meal_name meal_img_url",
      });

    if (!deletedPlate) {
      res.status(404).json({ message: "Plate not found" });
      return;
    }

    res.status(200).json(deletedPlate);
  } catch (error) {
    res.status(500).json({ message: "Unable to delete plate" });
    return;
  }
}

// -------------------------------------------------------------

export async function addPlateItem(req: Request, res: Response) {
  try {
    const { plate_id, meal_id } = req.params;

    const plate = await Plate.findById(plate_id);

    if (!plate) {
      res.status(404).json({ message: "Plate not found" });
      return;
    }

    const meal = await Meal.findById(meal_id);

    if (!meal) {
      res.status(404).json({ message: "Meal not found" });
      return;
    }

    const updatedPlate = await Plate.findByIdAndUpdate(
      plate_id,
      { $addToSet: { plate_items: { $each: [meal.id] } } },
      { new: true },
    )
      .populate({
        path: "seller_information.seller",
        model: "user",
        select: "id name avatar_url",
      })
      .populate({
        path: "plate_items",
        model: "meal",
        select: "id meal_name meal_img_url",
      });

    if (!updatedPlate) {
      res.status(400).json({ message: "Plate updation failed" });
      return;
    }

    res.status(201).json(updatedPlate);
  } catch (error) {
    res.status(500).json({ message: "Unable to add item in plate" });
    return;
  }
}

// -------------------------------------------------------------

export async function removePlateItem(req: Request, res: Response) {
  try {
    const { plate_id, meal_id } = req.params;

    const plate = await Plate.findById(plate_id);

    if (!plate) {
      res.status(404).json({ message: "Plate not found" });
      return;
    }

    const meal = await Meal.findById(meal_id);

    if (!meal) {
      res.status(404).json({ message: "Meal not found" });
      return;
    }

    const updatedPlate = await Plate.findByIdAndUpdate(
      plate_id,
      { $pull: { plate_items: meal.id } },
      { new: true },
    )
      .populate({
        path: "seller_information.seller",
        model: "user",
        select: "id name avatar_url",
      })
      .populate({
        path: "plate_items",
        model: "meal",
        select: "id meal_name meal_img_url",
      });

    if (!updatedPlate) {
      res.status(400).json({ message: "Plate updation failed" });
      return;
    }

    res.status(200).json(updatedPlate);
  } catch (error) {
    res.status(500).json({ message: "Unable to add item in plate" });
    return;
  }
}

// -------------------------------------------------------------

// collection controllers
// -------------------------------------------------------------

export async function getMealCollection(req: Request, res: Response) {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized: No User ID found" });
      return;
    }

    const meals = await Meal.find({
      "seller_information.seller": req.userId,
    }).populate({
      path: "seller_information.seller",
      model: "user",
      select: "id name avatar_url",
    });

    const plates = await Plate.find({
      "seller_information.seller": req.userId,
    })
      .populate({
        path: "seller_information.seller",
        model: "user",
        select: "id name avatar_url",
      })
      .populate({
        path: "plate_items",
        model: "meal",
        select: "id meal_name meal_img_url",
      });

    res.status(200).json({ meals, plates });
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch seller collection" });
    return;
  }
}

export async function getRecentOrderedMeals(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function getMostOrderedMeals(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function getMostOrderedPlates(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function orderMeal(req: Request, res: Response) {}

// -------------------------------------------------------------

// Public
// -------------------------------------------------------------

export async function getAllMeals(req: Request, res: Response) {
  try {
    const meals = await Meal.find()
      .populate({
        path: "seller_information.seller",
        model: "user",
        select: "id name avatar_url",
      })
      .sort({ createdAt: "desc" })
      .select("-createdAt -updatedAt");

    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch meals" });
    return;
  }
}
