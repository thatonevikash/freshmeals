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

export default router;
