import { Router } from "express";
import * as Controller from "../controllers/seller.controller";

// -------------------------------------------------------------

const router = Router();

router.get("/", Controller.getAllSeller);

router.put("/register", Controller.registerSeller);

router.put("/unregister", Controller.unregisterSeller);

export default router;
