import { z } from "zod";

export const createLabelSchema = z.object({
    name: z
        .string()
        .trim()
        .toLowerCase()
        .min(1, "Label name is required")
        .max(50, "Label name is too long"),
});

export const updateLabelSchema = z.object({
    name: z
        .string()
        .trim()
        .toLowerCase()
        .min(1, "Label name cannot be empty")
        .max(50, "Label name is too long")
        .optional(),

    color: z.string().optional(),

}).refine(
    (data) => data.name !== undefined || data.color !== undefined,
    {
        message: "Nothing to update!",
    }
);

export type CreateLabelInput = z.infer<typeof createLabelSchema>;
export type UpdateLabelInput = z.infer<typeof updateLabelSchema>;