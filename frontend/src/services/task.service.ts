import api from "../lib/api";
import type { Task } from "../types/task";

interface getTaskResponse {
    tasks: Task[];
}

export async function getTasks(projectId: string) {
    const response = await api.get<getTaskResponse>(
        `projects/${projectId}/tasks`
    );

    // console.log("Task Response : ", response.data)

    return response.data.tasks;
}

export interface CreateTaskInput {
    name: string;
    dueDate?: string;
}

export async function createTask(
    projectId: string,
    data: CreateTaskInput
) {
    const response = await api.post<{ task: Task }>(`/projects/${projectId}/tasks`, data);

    return response.data.task;
}

export interface UpdateTaskInput {
    name?: string;
    dueDate?: string;
    isCompleted?: boolean;
}

interface UpdateTaskResponse {
    task: Task;
}

export async function updateTask(
    taskId: string,
    data: UpdateTaskInput
) {
    const response = await api.patch<UpdateTaskResponse>(`/tasks/${taskId}`, data);

    return response.data.task;
}