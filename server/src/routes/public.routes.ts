import { Router } from "express";
import * as Controller from "../controllers/meal.controller";

// -------------------------------------------------------------

const router = Router();

router.get("/meals", Controller.getAllMeals);

export default router;
