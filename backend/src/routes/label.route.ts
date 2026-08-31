import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

// router.post("/", authMiddleware, createLabel);

// router.get("/", authMiddleware, getLabels);