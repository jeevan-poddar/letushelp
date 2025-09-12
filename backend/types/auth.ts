export interface User {
  id: number;
  email: string;
  role: "user" | "provider";
  first_name: string;
  last_name: string;
  phone?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  role: "user" | "provider";
  first_name: string;
  last_name: string;
  phone?: string;
}

export interface LoginInput {
  email: string;
  password: string;
  role: "user" | "provider";
}

export interface JWTPayload {
  userId: number;
  email: string;
  role: "user" | "provider";
}

export interface AuthResponse {
  user: Omit<User, "password_hash">;
  token: string;
}
