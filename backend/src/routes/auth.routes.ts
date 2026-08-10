import { Router } from "express";
import { signup, signin, getMe } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/me", authMiddleware, getMe);

export default router;