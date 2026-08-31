import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import * as taskService from "../services/task.service.js";
import { createTaskSchema, updateTaskSchema } from "../validations/task.validation.js";

export async function createTask(
    req: AuthRequest,
    res: Response,
) {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized!"
            })
        }

        const projectId = String(req.params.projectId)

        if (!projectId) {
            return res.status(400).json({
                message: "Project ID is required!"
            })
        }

        const result = createTaskSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid task data",
                errors: result.error,
            })
        }

        const task = await taskService.createTask(
            projectId,
            result.data,
            req.userId
        );

        return res.status(201).json({
            task,
        })


    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to create task",
        });
    }
}

export async function getTasks(
    req: AuthRequest,
    res: Response,
) {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized!"
            });
        }

        const projectId = String(req.params.projectId);

        if (!projectId || Array.isArray(projectId)) {
            return res.status(400).json({
                message: "Project ID is required!"
            })
        }

        const tasks = await taskService.getTasks(
            projectId,
            req.userId,
        )

        if (!tasks) {
            return res.status(404).json({
                message: "Project not found!"
            })
        }

        return res.status(200).json({
            tasks
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to fetch tasks",
        });
    }
}

export async function getTask(
    req: AuthRequest,
    res: Response,
) {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized!"
            })
        }

        const taskId = String(req.params.id);

        if (!taskId) {
            return res.status(400).json({
                message: "Task ID is required!"
            });
        }

        const task = await taskService.getTasksById(
            taskId,
            req.userId,
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found!"
            });
        }

        return res.status(200).json({
            task,
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to fetch task",
        });
    }
}

export async function updateTask(
    req: AuthRequest,
    res: Response,
) {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized!"
            });
        }

        const taskid = String(req.params.id);

        if (!taskid) {
            return res.status(400).json({
                message: "Task ID is required!"
            });
        }

        const result = updateTaskSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid task data",
                errors: result.error,
            })
        }

        const updatedTask = await taskService.updateTask(
            taskid,
            result.data,
            req.userId,
        )

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found!"
            })
        }

        return res.status(200).json({
            task: updatedTask,
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to update task",
        });
    }
}

export async function deleteTask(
    req: AuthRequest,
    res: Response,
) {
    try {
        if (!req.userId) {
            return res.status(400).json({
                message: "Unauthorized!"
            })
        }

        const taskId = String(req.params.id);

        if (!taskId) {
            return res.status(400).json({
                message: "Task ID is required!"
            });
        }

        const deletedTask = await taskService.deleteTask(
            taskId,
            req.userId,
        );

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found!"
            })
        }

        return res.status(200).json({
            message: "Task deleted successfully!",
            task: deletedTask,
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to delete task",
        });
    }
}