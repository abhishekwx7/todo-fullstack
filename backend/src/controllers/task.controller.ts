import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import * as taskService from "../services/task.service.js";
import { createTaskSchema } from "../validations/task.validation.js";


export async function createTask(
    req: AuthRequest,
    res: Response,
) {
    try {
        // 1. Get authenticated user

        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized!"
            })
        }

        // 2. Get projectId from req.params

        const projectId = String(req.params.projectId)

        if (!projectId) {
            return res.status(400).json({
                message: "Project ID is required!"
            })
        }

        const result = createTaskSchema.safeParse(req.body);

        // 3. Validate task data

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid task data",
                errors: result.error,
            })
        }

        // 4. Call task service

        const task = await taskService.createTask(
            projectId,
            result.data,
            req.userId
        );

        // 5. Return created task

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

        const id = String(req.params.id);

        const task = await taskService.getTasks
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
        // Get task id from req.params
        // Get authenticated user
        // Get update data from req.body
        // Call taskService.updateTask()
        // Return updated task
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
        // Get task id from req.params
        // Get authenticated user
        // Call taskService.deleteTask()
        // Return success response
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to delete task",
        });
    }
}