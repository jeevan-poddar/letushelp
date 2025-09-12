import pool from "../config/database.js";
import type {
  ProviderProfile,
  CreateProviderProfileInput,
} from "../types/booking.js";

export class ProviderProfileModel {
  static async create(
    userId: number,
    data: CreateProviderProfileInput
  ): Promise<ProviderProfile> {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Create provider profile
      const profileQuery = `
        INSERT INTO provider_profiles (user_id, city, bio, experience_years, hourly_rate)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;

      const profileValues = [
        userId,
        data.city,
        data.bio || null,
        data.experience_years || 0,
        data.hourly_rate || null,
      ];

      const profileResult = await client.query(profileQuery, profileValues);
      const profile = profileResult.rows[0];

      // Add services
      if (data.service_ids.length > 0) {
        const serviceQuery = `
          INSERT INTO provider_services (provider_id, service_id)
          VALUES ${data.service_ids.map((_, i) => `($1, $${i + 2})`).join(", ")}
        `;

        await client.query(serviceQuery, [profile.id, ...data.service_ids]);
      }

      await client.query("COMMIT");

      return this.getByUserId(userId) as unknown as ProviderProfile;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  static async getByUserId(userId: number): Promise<ProviderProfile | null> {
    const query = `
      SELECT 
        pp.*,
        json_agg(
          json_build_object(
            'id', s.id,
            'name', s.name,
            'description', s.description
          )
        ) FILTER (WHERE s.id IS NOT NULL) as services
      FROM provider_profiles pp
      LEFT JOIN provider_services ps ON pp.id = ps.provider_id
      LEFT JOIN services s ON ps.service_id = s.id
      WHERE pp.user_id = $1
      GROUP BY pp.id
    `;

    const result = await pool.query(query, [userId]);
    const row = result.rows[0];

    if (!row) return null;

    return {
      ...row,
      services: row.services || [],
    };
  }

  static async update(
    userId: number,
    data: Partial<CreateProviderProfileInput>
  ): Promise<ProviderProfile> {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Update profile
      const updateFields = [];
      const updateValues = [];
      let paramCount = 1;

      if (data.city !== undefined) {
        updateFields.push(`city = $${++paramCount}`);
        updateValues.push(data.city);
      }
      if (data.bio !== undefined) {
        updateFields.push(`bio = $${++paramCount}`);
        updateValues.push(data.bio);
      }
      if (data.experience_years !== undefined) {
        updateFields.push(`experience_years = $${++paramCount}`);
        updateValues.push(data.experience_years);
      }
      if (data.hourly_rate !== undefined) {
        updateFields.push(`hourly_rate = $${++paramCount}`);
        updateValues.push(data.hourly_rate);
      }

      if (updateFields.length > 0) {
        const updateQuery = `
          UPDATE provider_profiles 
          SET ${updateFields.join(", ")}
          WHERE user_id = $1
        `;

        await client.query(updateQuery, [userId, ...updateValues]);
      }

      // Update services if provided
      if (data.service_ids) {
        // Get provider profile to get provider_id
        const profileResult = await client.query(
          "SELECT id FROM provider_profiles WHERE user_id = $1",
          [userId]
        );
        const providerId = profileResult.rows[0].id;

        // Delete existing services
        await client.query(
          "DELETE FROM provider_services WHERE provider_id = $1",
          [providerId]
        );

        // Add new services
        if (data.service_ids.length > 0) {
          const serviceQuery = `
            INSERT INTO provider_services (provider_id, service_id)
            VALUES ${data.service_ids
              .map((_, i) => `($1, $${i + 2})`)
              .join(", ")}
          `;

          await client.query(serviceQuery, [providerId, ...data.service_ids]);
        }
      }

      await client.query("COMMIT");

      return this.getByUserId(userId) as unknown as ProviderProfile;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  static async toggleAvailability(userId: number): Promise<ProviderProfile> {
    const query = `
      UPDATE provider_profiles 
      SET is_available = NOT is_available
      WHERE user_id = $1
    `;

    await pool.query(query, [userId]);
    return this.getByUserId(userId) as unknown as ProviderProfile;
  }
}
