import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import * as labelService from "../services/label.service.js"
import { createLabelSchema, updateLabelSchema } from "../validations/label.validation.js"
import { id } from "zod/locales";

export async function createLabel(
    req: AuthRequest,
    res: Response,
) {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized!"
            })
        }

        const result = createLabelSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid label data",
                errors: result.error,
            })
        }

        const label = await labelService.createLabel(
            result.data,
            req.userId,
        );

        return res.status(201).json({
            message: "Label created successfully!",
            label,
        })
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "Label already exists"
        ) {
            return res.status(409).json({
                message: error.message,
            });
        }

        console.log(error);

        return res.status(500).json({
            message: "Failed to create label!"
        })
    }
}

export async function getLabels(
    req: AuthRequest,
    res: Response
) {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized!"
            });
        }

        const labels = await labelService.getLabels(req.userId);

        if (!labels) {
            return res.status(200).json({
                message: "Label not found!"
            })
        }

        return res.status(200).json({
            labels,
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to fetch labels"
        })
    }
}

export async function getLabelById(
    req: AuthRequest,
    res: Response
) {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized!"
            })
        }

        const labelId = String(req.params.id);

        const label = await labelService.getLabelById(
            labelId,
            req.userId
        )

        if (!labelId) {
            return res.status(404).json({
                message: "Label not found!"
            })
        }

        return res.status(200).json({
            label,
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to"
        })
    }
}

export async function updateLabel(
    req: AuthRequest,
    res: Response
) {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized!"
            });
        }

        const result = updateLabelSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid label data",
                errors: result.error,
            });
        }

        const labelId = String(req.params.id);

        const label = await labelService.updateLabel(
            labelId,
            result.data,
            req.userId
        );

        return res.status(200).json({
            message: "Label updated successfully!",
            label,
        })
    } catch (error) {
        if (
            error instanceof Error && error.message === "Label not found"
        ) {
            return res.status(404).json({
                message: error.message,
            });
        }

        if (
            error instanceof Error && error.message === "Label already exists"
        ) {
            return res.status(409).json({
                message: error.message,
            })
        }

        console.log(error);

        return res.status(500).json({
            message: "Failed to update label!"
        })
    }
}

export async function deleteLabel(
    req: AuthRequest,
    res: Response
) {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized!"
            })
        }

        const labelId = String(req.params.id);

        await labelService.deleteLabel(
            labelId,
            req.userId
        );

        return res.status(200).json({
            message: "Label deleted successfully!"
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to delete label!"
        })
    }
}