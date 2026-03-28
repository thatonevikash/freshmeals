import { Router } from "express";

import userRoutes from "./user.routes";
import mealRoutes from "./meal.routes";
import authRoutes from "./auth.routes";
import orderRoutes from "./order.routes";
import sellerRoutes from "./seller.routes";

// -------------------------------------------------------------

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/meal", mealRoutes);
router.use("/order", orderRoutes);
router.use("/seller", sellerRoutes);

export default router;
