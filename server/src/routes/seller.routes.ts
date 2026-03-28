import { Router } from "express";
import * as Controller from "../controllers/seller.controller";

// -------------------------------------------------------------

const router = Router();

router.get("/", Controller.getSellerCollection);

router.get("/meal", Controller.getSellerMeals);

router.post("/meal", Controller.createSellerMeal);

router.get("/plate", Controller.getSellerPlates);

router.post("/plate", Controller.createSellerPlate);

export default router;
