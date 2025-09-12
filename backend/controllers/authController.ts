import type { Request, Response } from "express";
import { UserModel } from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import type {
  CreateUserInput,
  LoginInput,
  AuthResponse,
} from "../types/auth.js";

export const register = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      role,
      first_name,
      last_name,
      phone,
    }: CreateUserInput = req.body;

    // Validation
    if (!email || !password || !role || !first_name || !last_name) {
      return res.status(400).json({
        error: "Email, password, role, first name, and last name are required",
      });
    }

    if (!["user", "provider"].includes(role)) {
      return res.status(400).json({
        error: 'Role must be either "user" or "provider"',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long",
      });
    }

    // Check if user already exists with this email and role
    const existingUser = await UserModel.findByEmailAndRole(email, role);
    if (existingUser) {
      return res.status(409).json({
        error: `A ${role} with this email already exists`,
      });
    }

    // Create user
    const user = await UserModel.create({
      email,
      password,
      role,
      first_name,
      last_name,
      phone,
    });

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response: AuthResponse = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      token,
    };

    res.status(201).json(response);
  } catch (error: any) {
    console.error("Registration error:", error);

    if (error.message === "Email already exists") {
      return res.status(409).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role }: LoginInput = req.body;

    // Validation
    if (!email || !password || !role) {
      return res.status(400).json({
        error: "Email, password, and role are required",
      });
    }

    if (!["user", "provider"].includes(role)) {
      return res.status(400).json({
        error: 'Role must be either "user" or "provider"',
      });
    }

    // Find user by email and role
    const user = await UserModel.findByEmailAndRole(email, role);
    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Verify password
    const isValidPassword = await UserModel.verifyPassword(
      password,
      (user as any).password_hash
    );
    if (!isValidPassword) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response: AuthResponse = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      token,
    };

    res.json(response);
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const user = await UserModel.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error: any) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
