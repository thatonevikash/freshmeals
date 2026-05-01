import { Router } from "express";

import * as Controller from "../controllers/user.controller.js";

// -------------------------------------------------------------

const router = Router();

router.get("/", Controller.getUser);

router.put("/", Controller.updateUser);

export default router;
