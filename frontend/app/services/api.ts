import axios from "axios";
import type {
  AuthResponse,
  LoginFormData,
  RegisterFormData,
} from "../types/auth";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      // Only redirect if not already on auth page
      if (!window.location.pathname.includes("/auth")) {
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    const { confirmPassword, ...registerData } = data;
    const response = await api.post("/auth/register", registerData);
    return response.data;
  },

  getProfile: async (): Promise<{ user: any }> => {
    const response = await api.get("/auth/profile");
    return response.data;
  },
};

export default api;
