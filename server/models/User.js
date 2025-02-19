const { pool } = require("../config/db");
const logger = require("../utils/logger");

class User {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        clerk_id VARCHAR(100) UNIQUE,
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
    try {
      await pool.query(query);
      logger.info("Users table created or already exists");
    } catch (error) {
      logger.error("Error creating users table:", error);
      throw error;
    }
  }

  static async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }

  static async create(userData) {
    try {
      const { name, email, password, clerk_id } = userData;
      logger.info("Creating user with data:", { name, email, clerk_id });

      const query = `
        INSERT INTO users (
          name, 
          email, 
          password,
          clerk_id,
          time_credits
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;

      const values = [name, email, password, clerk_id, 0];
      logger.info("Executing query with values:", values);

      const { rows } = await pool.query(query, values);
      logger.info("User created:", rows[0]);

      return rows[0];
    } catch (error) {
      logger.error("Error creating user:", error);
      throw error;
    }
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

  static async findById(id) {
    const query = "SELECT * FROM users WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async update(id, userData) {
    const { name, email, bio, skills } = userData;
    const query = `
      UPDATE users 
      SET 
        name = COALESCE($2, name),
        email = COALESCE($3, email),
        bio = COALESCE($4, bio),
        skills = COALESCE($5, skills)
      WHERE id = $1
      RETURNING *
    `;
    const { rows } = await pool.query(query, [id, name, email, bio, skills]);
    return rows[0];
  }

  static async findByClerkId(clerkId) {
    const query = "SELECT * FROM users WHERE clerk_id = $1";
    const { rows } = await pool.query(query, [clerkId]);
    return rows[0];
  }
}

module.exports = User;
