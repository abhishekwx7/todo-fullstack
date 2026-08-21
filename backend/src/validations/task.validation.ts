import { z } from "zod";

export const createTaskSchema = z.object({
    name: z.string().trim().min(1, "Task name is required"),
    dueDate: z.coerce.date().optional()
})

export const updateTaskSchema = z.object({
    name: z.string().trim().min(1, "Task name cannot be empty").optional(),
    dueDate: z.coerce.date().optional()
}).refine((data) => data.name !== undefined || data.dueDate !== undefined, {
    message: "Nothing to update",
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>