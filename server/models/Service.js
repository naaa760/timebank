const { pool } = require("../config/db");

class Service {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        provider_id INTEGER REFERENCES users(id),
        category VARCHAR(100),
        hours_per_session DECIMAL(4,2),
        tags TEXT[],
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await pool.query(query);
  }

  static async create(serviceData) {
    const { title, description, providerId, category, hoursPerSession, tags } =
      serviceData;
    const query = `
      INSERT INTO services (
        title, description, provider_id, category, 
        hours_per_session, tags
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const { rows } = await pool.query(query, [
      title,
      description,
      providerId,
      category,
      hoursPerSession,
      tags,
    ]);
    return rows[0];
  }

  static async findByProvider(providerId) {
    const query = `
      SELECT s.*, u.name as provider_name, u.rating as provider_rating
      FROM services s
      JOIN users u ON s.provider_id = u.id
      WHERE provider_id = $1
    `;
    const { rows } = await pool.query(query, [providerId]);
    return rows;
  }

  static async findActive() {
    const query = `
      SELECT s.*, u.name as provider_name, u.rating as provider_rating
      FROM services s
      JOIN users u ON s.provider_id = u.id
      WHERE s.status = 'active'
      ORDER BY s.created_at DESC
    `;
    const { rows } = await pool.query(query);
    return rows;
  }
}

module.exports = Service;
