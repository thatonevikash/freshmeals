import { Router } from "express";
import * as Controller from "../controllers/meal.controller";

// -------------------------------------------------------------

const router = Router();

router.get("/", Controller.getMeals);

router.post("/", Controller.createMeal);

router.get("/plate", Controller.getMealPlates);

router.post("/plate", Controller.createMealPlate);

router.get("/collection", Controller.getMealCollection);

router.get("/plate/:plate_id", Controller.getMealPlate);

router.put("/plate/:plate_id", Controller.updateMealPlate);

router.delete("/plate/:plate_id", Controller.deleteMealPlate);

router.patch("/plate/:plate_id/add/:meal_id", Controller.addPlateItem);

router.patch("/plate/:plate_id/remove/:meal_id", Controller.removePlateItem);

router.post("/order", Controller.orderMeal);

router.get("/recent_ordered", Controller.getRecentOrderedMeals);

router.get("/most_ordered/item", Controller.getMostOrderedMeals);

router.get("/most_ordered/plate", Controller.getMostOrderedPlates);

router.get("/plate/:plate_id", Controller.getMealPlate);

router.get("/:meal_id", Controller.getMeal);

router.put("/:meal_id", Controller.updateMeal);

router.delete("/:meal_id", Controller.deleteMeal);

export default router;
