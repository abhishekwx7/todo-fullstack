import prisma from "../config/prisma.js";
import type { CreateTaskInput, TaskQueryInput, UpdateTaskInput } from "../validations/task.validation.js";


export async function createTask(
    projectId: string,
    data: CreateTaskInput,
    userId: string
) {

    const project = await prisma.project.findFirst({
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
        },
        include: {
            labels: true
        }
    });

    return task;
}

export async function getTasks(projectId: string, userId: string, query: TaskQueryInput) {
    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            userId,
        }
    });

    if (!project) {
        return null;
    }

    const { search, status, labels } = query;

    const hasLabelFilter = labels !== undefined && labels.length > 0;

    return await prisma.task.findMany({
        where: {
            projectId,

            ...(hasLabelFilter ? {
                labels: {
                    some: {
                        id: {
                            in: labels
                        }
                    }
                }
            } : {
                ...(search && {
                    name: {
                        contains: search,
                        mode: "insensitive"
                    },
                }),

                ...(status === "pending" && {
                    isCompleted: false,
                }),

                ...(status === "completed" && {
                    isCompleted: true,
                })
            })


        },
        include: {
            labels: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

export async function getTaskById(taskId: string, userId: string) {
    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            project: {
                userId,
            },
        },
        include: {
            labels: true,
        }
    });

    return task;
}

export async function updateTask(taskId: string, data: UpdateTaskInput, userId: string) {
    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            project: {
                userId,
            }
        },
    });

    if (!task) {
        return null;
    }

    return prisma.task.update({
        where: {
            id: taskId,
        },
        data,
        include: {
            labels: true,
        }
    });
}

export async function deleteTask(
    taskId: string, userId: string,
) {
    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            project: {
                userId,
            },
        },
    });

    if (!task) {
        return null;
    }

    return prisma.task.delete({
        where: {
            id: taskId,
        }
    })
}

export async function attachLabelToTask(
    taskId: string,
    labelId: string,
    userId: string
) {
    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            project: {
                userId,
            },
        },
    });

    if (!task) {
        throw new Error("Task not found");
    }

    const label = await prisma.label.findFirst({
        where: {
            id: labelId,
            userId,
        },
    });

    if (!label) {
        throw new Error("Label not found");
    }

    return prisma.task.update({
        where: {
            id: taskId,
        },
        data: {
            labels: {
                connect: {
                    id: labelId,
                },
            },
        },
        include: {
            labels: true,
        },
    });
}

export async function removeLabelfromTask(
    taskId: string,
    labelId: string,
    userId: string,
) {
    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            project: {
                userId,
            },
        },
    });

    if (!task) {
        throw new Error("Task not found")
    }

    const label = await prisma.label.findFirst({
        where: {
            id: labelId,
            userId,
        },
    });

    if (!label) {
        throw new Error("Label not found")
    }

    return prisma.task.update({
        where: {
            id: taskId,
        },
        data: {
            labels: {
                disconnect: {
                    id: labelId,
                },
            },
        },
        include: {
            labels: true,
        },
    });
}