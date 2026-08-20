import { Router } from "express";
import { createProject, getProjects, getProject, updateProject, deleteProject } from "../controllers/project.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createTask } from "../controllers/task.controller.js";

const router = Router();

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);

router.get("/:id", authMiddleware, getProject);
router.patch("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

router.post("/:projectId/tasks", authMiddleware, createTask);

export default router;