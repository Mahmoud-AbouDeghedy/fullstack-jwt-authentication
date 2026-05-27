import axios from "axios";
import { AuthResponse, SignInFormValues, SignUpFormValues } from "../types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add token to requests if available
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export const signUp = async (data: SignUpFormValues): Promise<AuthResponse> => {
	const response = await api.post<AuthResponse>("/auth/signup", data);
	return response.data;
};

export const signIn = async (data: SignInFormValues): Promise<AuthResponse> => {
	const response = await api.post<AuthResponse>("/auth/signin", data);
	return response.data;
};

export const getProfile = async () => {
	const response = await api.get("/auth/profile");
	return response.data;
};

export default api;
