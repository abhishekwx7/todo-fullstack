import type { Label } from "./label";

export interface Task {
    id: string;
    name: string;
    isCompleted: boolean;
    dueDate: string | null;
    projectId: string;
    labels: Label[];
    createdAt: string;
    updatedAt: string;
}