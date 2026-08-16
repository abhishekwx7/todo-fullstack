import prisma from "../config/prisma.js";

export async function createProject(
    name: string,
    color: string | undefined,
    userId: string
) {
    const project = await prisma.project.create({
        data: {
            name,
            color,
            userId
        }
    });

    return project;
}

export async function getProjects(userId: string) {
    return await prisma.project.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

export async function getProjectById(
    id: string,
    userId: string
) {
    return prisma.project.findFirst({
        where: {
            id,
            userId,
        }
    })
}

export async function updateProject(
    id: string,
    userId: string,
    data: {
        name?: string;
        color?: string;
    }
) {
    return prisma.project.updateMany({
        where: {
            id,
            userId,
        },
        data,
    });
}

export async function deleteProjectService(
    id: string,
    userId: string,
) {
    const project = await prisma.project.findFirst({
        where: {
            id,
            userId,
        }
    });

    if (!project) {
        return null;
    }

    return prisma.project.delete({
        where: {
            id,
        }
    })
}