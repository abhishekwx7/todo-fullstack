export interface Task {
    id: string;
    name: string;
    isCompleted: boolean;
    dueDate: string | null;
    projectId: string;
    createdAt: string;
    updatedAt: string;
}