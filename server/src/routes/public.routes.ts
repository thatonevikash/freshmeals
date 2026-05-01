import { Router } from "express";
import * as Controller from "../controllers/meal.controller.js";

// -------------------------------------------------------------

const router = Router();

router.get("/meals", Controller.getAllMeals);

router.get("/plates", Controller.getAllPlates);

export default router;
