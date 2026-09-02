import { Router } from "express";

import {
    createLabel,
    getLabels,
    getLabelById,
    updateLabel,
    deleteLabel,
} from "../controllers/label.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createLabel);
router.get("/", authMiddleware, getLabels);
router.get("/:id", authMiddleware, getLabelById);
router.patch("/:id", authMiddleware, updateLabel);
router.delete("/:id", authMiddleware, deleteLabel);

export default router;