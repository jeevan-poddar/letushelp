import pool from "../config/database.js";
import type { Service } from "../types/booking.js";

export class ServiceModel {
  static async getAll(): Promise<Service[]> {
    const query = "SELECT * FROM services ORDER BY name";
    const result = await pool.query(query);
    return result.rows;
  }

  static async getById(id: number): Promise<Service | null> {
    const query = "SELECT * FROM services WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
}
