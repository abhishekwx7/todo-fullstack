import prisma from "../config/prisma.js";
import { CreateLabelInput, UpdateLabelInput } from "../validations/label.validation.js";

export async function createLabel(
    data: CreateLabelInput,
    userId: string
) {
    const existingLabel = await prisma.label.findFirst({
        where: {
            name: data.name,
            userId,
        }
    });

    if (existingLabel) {
        throw new Error("Label already exists")
    }

    const label = await prisma.label.create({
        data: {
            name: data.name,
            userId,
        },
    });

    return label;
}

export async function getLabels(userId: String) {
    return await prisma.label.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        }
    });
}

export async function getLabelById(
    labelId: string,
    userId: string,
) {
    return await prisma.label.findFirst({
        where: {
            id: labelId,
            userId,
        },
    });
}

export async function updateLabel(
    labelId: string,
    data: UpdateLabelInput,
    userId: string,
) {
    const label = await prisma.label.findFirst({
        where: {
            id: labelId,
            userId,
        },
    });

    if (!label) {
        throw new Error("Label not found!");
    }

    return await prisma.label.update({
        where: {
            id: labelId,
        },
        data,
    });
}

export async function deleteLabel(
    labelId: string,
    userId: string,
) {
    const label = await prisma.label.findFirst({
        where: {
            id: labelId,
            userId,
        },
    });

    if (!label) {
        throw new Error("Label not found!");
    }

    return await prisma.label.delete({
        where: {
            id: labelId,
        },
    });
} 