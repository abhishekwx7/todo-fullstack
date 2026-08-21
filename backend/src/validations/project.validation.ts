import { z } from "zod";

export const createProjectSchema = z.object({
    name: z.string().trim().min(1, "Project name is required"),
    color: z.string().optional()
});

export const updateProjectSchema = z.object({
    name: z.string().trim().min(1, "Project name cannot be empty").optional(),
    color: z.string().optional()
}).refine((data) => data.name !== undefined || data.color !== undefined, {
    message: "Nothing to update",
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;