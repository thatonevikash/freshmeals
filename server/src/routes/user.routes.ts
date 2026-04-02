import { Router } from "express";

import * as Controller from "../controllers/user.controller";

// -------------------------------------------------------------

const router = Router();

router.get("/", Controller.getUser);

export default router;
