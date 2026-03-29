import { Router } from "express";

import * as Auth from "../middlewares/auth.middleware";

import userRoutes from "./user.routes";
import mealRoutes from "./meal.routes";
import authRoutes from "./auth.routes";
import orderRoutes from "./order.routes";
import sellerRoutes from "./seller.routes";

// -------------------------------------------------------------

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", Auth.isAuthenticated, userRoutes);
router.use("/meal", Auth.isAuthenticated, mealRoutes);
router.use("/order", Auth.isAuthenticated, orderRoutes);
router.use("/seller", Auth.isAuthenticated, sellerRoutes);

export default router;
