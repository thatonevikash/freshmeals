import { Router } from "express";

import * as Controller from "../controllers/user.controller";

// -------------------------------------------------------------

const router = Router();

router.get("/", Controller.getUser);

router.put("/:user_id/seller", Controller.updateUser);

export default router;
