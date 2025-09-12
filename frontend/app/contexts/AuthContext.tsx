import React, { createContext, useContext, useState, useEffect } from "react";
import type {
  User,
  AuthContextType,
  LoginFormData,
  RegisterFormData,
} from "../types/auth";
import { authAPI } from "../services/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const mapAuthErrorMessage = (
    action: "login" | "register",
    error: any
  ): string => {
    const status: number | undefined = error?.response?.status;
    const serverMessage: string | undefined = error?.response?.data?.error;

    if (!error?.response) {
      return "Network error. Please check your connection and try again.";
    }

    if (action === "login") {
      if (status === 401) return "Incorrect email or password.";
      if (status === 400) return serverMessage || "Invalid login request.";
      return serverMessage || "Login failed. Please try again.";
    }

    // register
    if (status === 409)
      return (
        serverMessage ||
        "An account with this email already exists for this role."
      );
    if (status === 400) return serverMessage || "Please check your details.";
    return serverMessage || "Registration failed. Please try again.";
  };

  // Initialize auth state from localStorage
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("authToken");
      const savedUser = localStorage.getItem("user");

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("AuthContext: Error initializing auth:", error);
      // Clear potentially corrupted data
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (data: LoginFormData): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authAPI.login(data);
      const { user, token } = response;

      setUser(user);
      setToken(token);

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error: any) {
      throw new Error(mapAuthErrorMessage("login", error));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterFormData): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authAPI.register(data);
      const { user, token } = response;

      setUser(user);
      setToken(token);

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error: any) {
      throw new Error(mapAuthErrorMessage("register", error));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
