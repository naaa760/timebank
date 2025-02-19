const { pool } = require("../config/db");

class User {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100),
        bio TEXT,
        time_credits DECIMAL(10,2) DEFAULT 0,
        skills TEXT[],
        rating DECIMAL(3,2) DEFAULT 0,
        review_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await pool.query(query);
  }

  static async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }

  static async create(userData) {
    const { name, email, password } = userData;
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const { rows } = await pool.query(query, [name, email, password]);
    return rows[0];
  }

  static async updateTimeCredits(userId, amount) {
    const query = `
      UPDATE users 
      SET time_credits = time_credits + $2
      WHERE id = $1
      RETURNING *
    `;
    const { rows } = await pool.query(query, [userId, amount]);
    return rows[0];
  }
}

module.exports = User;
