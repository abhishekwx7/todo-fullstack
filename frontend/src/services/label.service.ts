import api from "../lib/api";
import type { Label } from "../types/label";
import type { Task } from "../types/task";

export interface CreateLabelInput {
    name: string;
    color?: string;
}

interface GetLabelsResponse {
    labels: Label[];
}

interface CreateLabelResponse {
    message: string;
    label: Label;
}

interface TaskLabelResponse {
    message: string;
    task: Task;
}

export async function getLabels() {
    const response = await api.get<GetLabelsResponse>("/labels");

    return response.data.labels;
}

export async function createLabel(data: CreateLabelInput) {
    const response = await api.post<CreateLabelResponse>("/labels", data);

    return response.data.label;
}

export async function attachLabelToTask(
    taskId: string,
    labelId: string
) {
    const response = await api.post<TaskLabelResponse>(`/tasks/${taskId}/labels/${labelId}`);

    return response.data.task;
}

export async function removeLabelFromTask(taskId: string, labelId: string) {
    const response = await api.delete<TaskLabelResponse>(`/tasks/${taskId}/labels/${labelId}`);

    return response.data.task;
}