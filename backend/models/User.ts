import bcrypt from "bcryptjs";
import pool from "../config/database.js";
import type { User, CreateUserInput } from "../types/auth.js";
import { authConfig } from "../config/auth.js";

export class UserModel {
  static async create(userData: CreateUserInput): Promise<User> {
    const { email, password, role, first_name, last_name, phone } = userData;

    // Hash password
    const password_hash = await bcrypt.hash(password, authConfig.bcryptRounds);

    const query = `
      INSERT INTO users (email, password_hash, role, first_name, last_name, phone)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, email, role, first_name, last_name, phone, created_at, updated_at
    `;

    const values = [
      email,
      password_hash,
      role,
      first_name,
      last_name,
      phone || null,
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      if (error.code === "23505") {
        // Unique constraint violation
        throw new Error("Email already exists");
      }
      throw error;
    }
  }

  static async findByEmail(email: string): Promise<User | null> {
    const query = `
      SELECT id, email, password_hash, role, first_name, last_name, phone, created_at, updated_at
      FROM users 
      WHERE email = $1
    `;

    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  static async findByEmailAndRole(
    email: string,
    role: "user" | "provider"
  ): Promise<User | null> {
    const query = `
      SELECT id, email, password_hash, role, first_name, last_name, phone, created_at, updated_at
      FROM users 
      WHERE email = $1 AND role = $2
    `;

    const result = await pool.query(query, [email, role]);
    return result.rows[0] || null;
  }

  static async findById(id: number): Promise<User | null> {
    const query = `
      SELECT id, email, role, first_name, last_name, phone, created_at, updated_at
      FROM users 
      WHERE id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async verifyPassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
