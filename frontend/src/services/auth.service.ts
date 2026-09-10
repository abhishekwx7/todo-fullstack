import api from "../lib/api";
import type {
    AuthResponse, GetMeResponse, SignUpInput, SignInInput
} from "../types/auth";

export async function signup(data: SignUpInput) {
    const response = await api.post<AuthResponse>("/auth/signup", data);

    return response.data;
}

export async function signin(data: SignInInput) {
    const response = await api.post<AuthResponse>("/auth/signin", data);

    return response.data;
}

export async function getMe() {
    const response = await api.get<GetMeResponse>("/auth/me");

    return response.data;
}