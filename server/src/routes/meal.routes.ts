import { Router } from "express";
import {
  getMeal,
  getMeals,
  createMeal,
  deleteMeal,
  updateMeal,
} from "../controllers/meal.controller";

// -------------------------------------------------------------

const router = Router();

router.get("/", getMeals);
router.post("/", createMeal);
router.get("/:name", getMeal);
router.put("/:mealId", updateMeal);
router.delete("/:mealId", deleteMeal);

export default router;
