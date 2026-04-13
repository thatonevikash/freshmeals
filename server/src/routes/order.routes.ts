import { Router } from "express";

import * as Controller from "../controllers/order.controller";

// -------------------------------------------------------------

const router = Router();

router.get("/", Controller.getOrders);

router.post("/", Controller.makeAnOrder);

router.get("/:order_id", Controller.getOrder);

router.put("/:order_id", Controller.updateOrder);

router.put("/:order_id/cancel", Controller.cancelOrder);

export default router;
