import { Router } from "express";
import { signup, signin, getMe } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/me", authMiddleware, getMe);

export default router;