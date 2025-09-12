import pool from "../config/database.js";
import type {
  ServiceRequest,
  ServiceRequestWithDetails,
  CreateServiceRequestInput,
} from "../types/booking.js";

export class ServiceRequestModel {
  static async create(
    userId: number,
    data: CreateServiceRequestInput
  ): Promise<ServiceRequest> {
    const query = `
      INSERT INTO service_requests (
        user_id, service_id, title, description, address, city,
        preferred_date, preferred_time, budget_min, budget_max
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;

    const values = [
      userId,
      data.service_id,
      data.title,
      data.description || null,
      data.address,
      data.city,
      data.preferred_date || null,
      data.preferred_time || null,
      data.budget_min || null,
      data.budget_max || null,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getByUserId(
    userId: number
  ): Promise<ServiceRequestWithDetails[]> {
    const query = `
      SELECT 
        sr.*,
        json_build_object(
          'id', s.id,
          'name', s.name,
          'description', s.description
        ) as service,
        json_build_object(
          'first_name', u.first_name,
          'last_name', u.last_name,
          'phone', u.phone
        ) as user
      FROM service_requests sr
      JOIN services s ON sr.service_id = s.id
      JOIN users u ON sr.user_id = u.id
      WHERE sr.user_id = $1
      ORDER BY sr.created_at DESC
    `;

    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async getAvailableForProvider(
    providerId: number
  ): Promise<ServiceRequestWithDetails[]> {
    const query = `
      SELECT 
        sr.*,
        json_build_object(
          'id', s.id,
          'name', s.name,
          'description', s.description
        ) as service,
        json_build_object(
          'first_name', u.first_name,
          'last_name', u.last_name,
          'phone', u.phone
        ) as user
      FROM service_requests sr
      JOIN services s ON sr.service_id = s.id
      JOIN users u ON sr.user_id = u.id
      JOIN provider_profiles pp ON pp.id = $1
      JOIN provider_services ps ON ps.provider_id = pp.id AND ps.service_id = sr.service_id
      WHERE sr.status = 'pending'
        AND LOWER(sr.city) = LOWER(pp.city)
        AND NOT EXISTS (
          SELECT 1 FROM bookings b WHERE b.request_id = sr.id
        )
      ORDER BY sr.created_at DESC
    `;

    const result = await pool.query(query, [providerId]);
    return result.rows;
  }

  static async getById(id: number): Promise<ServiceRequestWithDetails | null> {
    const query = `
      SELECT 
        sr.*,
        json_build_object(
          'id', s.id,
          'name', s.name,
          'description', s.description
        ) as service,
        json_build_object(
          'first_name', u.first_name,
          'last_name', u.last_name,
          'phone', u.phone
        ) as user
      FROM service_requests sr
      JOIN services s ON sr.service_id = s.id
      JOIN users u ON sr.user_id = u.id
      WHERE sr.id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async updateStatus(
    id: number,
    status: ServiceRequest["status"]
  ): Promise<ServiceRequest> {
    const query = `
      UPDATE service_requests 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;

    const result = await pool.query(query, [status, id]);
    return result.rows[0];
  }

  static async delete(id: number, userId: number): Promise<boolean> {
    const query = `
      DELETE FROM service_requests 
      WHERE id = $1 AND user_id = $2 AND status = 'pending'
    `;

    const result = await pool.query(query, [id, userId]);
    return (result.rowCount ?? 0) > 0;
  }
}
