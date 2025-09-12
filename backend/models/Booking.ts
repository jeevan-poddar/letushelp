import pool from "../config/database.js";
import type {
  Booking,
  BookingWithDetails,
  CreateBookingInput,
} from "../types/booking.js";

export class BookingModel {
  static async create(
    providerId: number,
    data: CreateBookingInput
  ): Promise<Booking> {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Create booking
      const bookingQuery = `
        INSERT INTO bookings (
          request_id, provider_id, reference_id, scheduled_date, scheduled_time,
          estimated_duration, final_price, notes
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;

      // Generate reference id like BKG-YYYYMMDD-<8 hex>
      const date = new Date();
      const yyyy = String(date.getFullYear());
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const rand = Math.random().toString(16).slice(2, 10).toUpperCase();
      const referenceId = `BKG-${yyyy}${mm}${dd}-${rand}`;

      const bookingValues = [
        data.request_id,
        providerId,
        referenceId,
        data.scheduled_date || null,
        data.scheduled_time || null,
        data.estimated_duration || null,
        data.final_price || null,
        data.notes || null,
      ];

      const bookingResult = await client.query(bookingQuery, bookingValues);
      const booking = bookingResult.rows[0];

      // Update service request status
      await client.query(
        "UPDATE service_requests SET status = 'accepted' WHERE id = $1",
        [data.request_id]
      );

      await client.query("COMMIT");
      return booking;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  static async getByProviderId(
    providerId: number
  ): Promise<BookingWithDetails[]> {
    const query = `
      SELECT 
        b.*,
        json_build_object(
          'id', sr.id,
          'title', sr.title,
          'description', sr.description,
          'address', sr.address,
          'city', sr.city,
          'preferred_date', sr.preferred_date,
          'preferred_time', sr.preferred_time,
          'budget_min', sr.budget_min,
          'budget_max', sr.budget_max,
          'status', sr.status,
          'service', json_build_object(
            'id', s.id,
            'name', s.name,
            'description', s.description
          ),
          'user', json_build_object(
            'first_name', u.first_name,
            'last_name', u.last_name,
            'phone', u.phone
          )
        ) as request
      FROM bookings b
      JOIN service_requests sr ON b.request_id = sr.id
      JOIN services s ON sr.service_id = s.id
      JOIN users u ON sr.user_id = u.id
      WHERE b.provider_id = $1
      ORDER BY b.created_at DESC
    `;

    const result = await pool.query(query, [providerId]);
    return result.rows.map((row) => ({
      ...row,
      provider: null, // Not needed when querying by provider
    }));
  }

  static async getByUserId(userId: number): Promise<BookingWithDetails[]> {
    const query = `
      SELECT 
        b.*,
        json_build_object(
          'id', sr.id,
          'title', sr.title,
          'description', sr.description,
          'address', sr.address,
          'city', sr.city,
          'preferred_date', sr.preferred_date,
          'preferred_time', sr.preferred_time,
          'budget_min', sr.budget_min,
          'budget_max', sr.budget_max,
          'status', sr.status,
          'service', json_build_object(
            'id', s.id,
            'name', s.name,
            'description', s.description
          ),
          'user', json_build_object(
            'first_name', u.first_name,
            'last_name', u.last_name,
            'phone', u.phone
          )
        ) as request,
        json_build_object(
          'user', json_build_object(
            'first_name', pu.first_name,
            'last_name', pu.last_name,
            'phone', pu.phone
          ),
          'city', pp.city,
          'hourly_rate', pp.hourly_rate
        ) as provider
      FROM bookings b
      JOIN service_requests sr ON b.request_id = sr.id
      JOIN services s ON sr.service_id = s.id
      JOIN users u ON sr.user_id = u.id
      JOIN provider_profiles pp ON b.provider_id = pp.id
      JOIN users pu ON pp.user_id = pu.id
      WHERE sr.user_id = $1
      ORDER BY b.created_at DESC
    `;

    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async updateStatus(
    id: number,
    status: Booking["status"],
    providerId?: number
  ): Promise<Booking> {
    let query = `
      UPDATE bookings 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
    `;

    const values = [status, id];

    if (providerId) {
      query += " AND provider_id = $3";
      values.push(providerId);
    }

    query += " RETURNING *";

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async update(
    id: number,
    providerId: number,
    data: Partial<CreateBookingInput>
  ): Promise<Booking> {
    const updateFields = [];
    const updateValues = [];
    let paramCount = 2;

    if (data.scheduled_date !== undefined) {
      updateFields.push(`scheduled_date = $${++paramCount}`);
      updateValues.push(data.scheduled_date);
    }
    if (data.scheduled_time !== undefined) {
      updateFields.push(`scheduled_time = $${++paramCount}`);
      updateValues.push(data.scheduled_time);
    }
    if (data.estimated_duration !== undefined) {
      updateFields.push(`estimated_duration = $${++paramCount}`);
      updateValues.push(data.estimated_duration);
    }
    if (data.final_price !== undefined) {
      updateFields.push(`final_price = $${++paramCount}`);
      updateValues.push(data.final_price);
    }
    if (data.notes !== undefined) {
      updateFields.push(`notes = $${++paramCount}`);
      updateValues.push(data.notes);
    }

    const query = `
      UPDATE bookings 
      SET ${updateFields.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND provider_id = $2
      RETURNING *
    `;

    const result = await pool.query(query, [id, providerId, ...updateValues]);
    return result.rows[0];
  }
}
