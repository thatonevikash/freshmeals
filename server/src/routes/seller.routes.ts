import { Router } from "express";
import * as Controller from "../controllers/seller.controller";

// -------------------------------------------------------------

const router = Router();

router.get("/", Controller.getAllSeller);

router.get("/meal", Controller.getSellerMeals);

router.post("/meal", Controller.createSellerMeal);

router.get("/plate", Controller.getSellerPlates);

router.post("/plate", Controller.createSellerPlate);

router.get("/collection", Controller.getSellerCollection);

router.get("/meal/:meal_id", Controller.getSellerMeal);

router.put("/meal/:meal_id", Controller.updateSellerMeal);

router.delete("/meal/:meal_id", Controller.deleteSellerMeal);

router.get("/plate/:plate_id", Controller.getSellerPlate);

router.put("/plate/:plate_id", Controller.updateSellerPlate);

router.patch("/plate/:plate_id/add/:meal_id", Controller.addSellerPlateItem);

router.patch(
  "/plate/:plate_id/remove/:meal_id",
  Controller.removeSellerPlateItem,
);

export default router;
