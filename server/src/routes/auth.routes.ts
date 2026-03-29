import { Router } from "express";
import * as Auth from "../controllers/auth.controller";

// -------------------------------------------------------------

const router = Router();

router.post("/login", Auth.login);

router.post("/signup", Auth.signup);

export default router;
