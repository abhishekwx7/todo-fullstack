export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export interface SignUpInput {
    name: string;
    email: string;
    password: string;
}

export interface SignInInput {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface GetMeResponse {
    user: User;
}