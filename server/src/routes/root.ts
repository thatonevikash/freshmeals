import { Router } from "express";

import * as Auth from "../middlewares/auth.middleware.js";

import userRoutes from "./user.routes.js";
import mealRoutes from "./meal.routes.js";
import authRoutes from "./auth.routes.js";
import orderRoutes from "./order.routes.js";
import sellerRoutes from "./seller.routes.js";

import publicRoutes from "./public.routes.js";

// -------------------------------------------------------------

const router = Router();

// public
router.use(publicRoutes);
router.use("/auth", authRoutes);

// private
router.use("/user", Auth.isAuthenticated, userRoutes);
router.use("/meal", Auth.isAuthenticated, mealRoutes);
router.use("/order", Auth.isAuthenticated, orderRoutes);
router.use("/seller", Auth.isAuthenticated, sellerRoutes);

export default router;
