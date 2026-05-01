import { Router } from "express";
import * as Auth from "../middlewares/auth.middleware.js";
import * as Controller from "../controllers/meal.controller.js";

// -------------------------------------------------------------

const router = Router();

router.get("/", Auth.isAuthorizedSeller, Controller.getMeals);

router.post("/", Auth.isAuthorizedSeller, Controller.createMeal);

router.get("/plate", Auth.isAuthorizedSeller, Controller.getMealPlates);

router.post("/plate", Auth.isAuthorizedSeller, Controller.createMealPlate);

router.get(
  "/collection",
  Auth.isAuthorizedSeller,
  Controller.getMealCollection,
);

router.get("/plate/:plate_id", Controller.getMealPlate);

router.put(
  "/plate/:plate_id",
  Auth.isAuthorizedSeller,
  Controller.updateMealPlate,
);

router.delete(
  "/plate/:plate_id",
  Auth.isAuthorizedSeller,
  Controller.deleteMealPlate,
);

router.patch(
  "/plate/:plate_id/add/:meal_id",
  Auth.isAuthorizedSeller,
  Controller.addPlateItem,
);

router.patch(
  "/plate/:plate_id/remove/:meal_id",
  Auth.isAuthorizedSeller,
  Controller.removePlateItem,
);

router.post("/order", Controller.orderMeal);

router.get("/recent_ordered", Controller.getRecentOrderedMeals);

router.get("/most_ordered/item", Controller.getMostOrderedMeals);

router.get("/most_ordered/plate", Controller.getMostOrderedPlates);

router.get("/plate/:plate_id", Controller.getMealPlate);

router.get("/:meal_id", Controller.getMeal);

router.put("/:meal_id", Auth.isAuthorizedSeller, Controller.updateMeal);

router.delete("/:meal_id", Auth.isAuthorizedSeller, Controller.deleteMeal);

export default router;
