export interface User {
  id: number;
  email: string;
  role: "user" | "provider";
  first_name: string;
  last_name: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  role: "user" | "provider";
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  role: "user" | "provider";
  first_name: string;
  last_name: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}
