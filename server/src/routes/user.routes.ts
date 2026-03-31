import { Router } from "express";

import * as Controller from "../controllers/user.controller";

// -------------------------------------------------------------

const router = Router();

router.get("/", Controller.getUser);

router.put("/seller/register", Controller.registerSeller);

router.put("/seller/unregister", Controller.unregisterSeller);

export default router;
