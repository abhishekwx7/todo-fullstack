import prisma from "../config/prisma.js";
import type { CreateTaskInput } from "../validations/task.validation.js";

export async function createTask(
    projectId: string,
    data: CreateTaskInput,
    userId: string
) {

    const project = await prisma.project.FindFirst({
        where: {
            id: projectId,
            userId,
        }
    });

    if (!project) {
        return null;
    }

    const task = await prisma.task.create({
        data: {
            ...data,
            projectId,
            userId
        }
    });

    return task;
}

export async function getTasks(projectId: string, userId: string) {
    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            userId,
        }
    });

    if (!project) {
        return null;
    }

    return await prisma.task.findMany({
        where: {
            projectId,
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}