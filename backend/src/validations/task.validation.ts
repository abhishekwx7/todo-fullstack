import { z } from "zod";

export const createTaskSchema = z.object({
    name: z.string().trim().min(1, "Task name is required"),
    dueDate: z.coerce.date().optional(),
});

export const updateTaskSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, "Task name cannot be empty")
            .optional(),

        dueDate: z.coerce.date().optional(),

        isCompleted: z.boolean().optional(),
    })
    .refine(
        (data) =>
            data.name !== undefined ||
            data.dueDate !== undefined ||
            data.isCompleted !== undefined,
        {
            message: "Nothing to update",
        },
    );

export const taskQuerySchema = z.object({
    search: z.string().trim().max(100, "Search query is too long").optional(),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type TaskQueryInput = z.infer<typeof taskQuerySchema>