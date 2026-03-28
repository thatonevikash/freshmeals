import { Router } from "express";
import * as Controller from "../controllers/meal.controller";

// -------------------------------------------------------------

const router = Router();

router.post("/order", Controller.orderMeal);

router.get("/recent_ordered", Controller.getRecentOrderedMeals);

router.get("/most_ordered/item", Controller.getMostOrderedMeals);

router.get("/most_ordered/plate", Controller.getMostOrderedPlates);

router.get("/plate/:plate_id", Controller.getMealPlate);

router.get("/:meal_id", Controller.getMeal);

export default router;
