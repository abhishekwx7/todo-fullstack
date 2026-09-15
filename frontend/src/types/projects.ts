export interface Project {
    id: string;
    name: string;
    color?: string | null;
    userId: string;
    createdAt: string;
}

export interface CreateProjectInput {
    name: string;
    color?: string;
}

export interface UpdateProjectInput {
    name?: string;
    color?: string;
}

export interface ProjectsResponse {
    projects: Project[];
}

export interface ProjectResponse {
    project: Project;
}

export interface DeleteProjectResponse {
    message: string;
    project: Project;
}