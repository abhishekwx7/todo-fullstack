import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import * as taskService from "../services/task.service.js";

export async function createTask(
    req: AuthRequest,
    res: Response,
) {
    try {
        // 1. Get authenticated user
        // 2. Get projectId from req.params
        // 3. Get task data from req.body
        // 4. Call taskService.createTask()
        // 5. Return created task
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
        // Get authenticated user's tasks
        // Call taskService.getTasks()
        // Return tasks
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
        // Get task id from req.params
        // Get authenticated user
        // Call taskService.getTask()
        // Return task
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