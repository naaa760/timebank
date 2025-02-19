const { Pool } = require("pg");
const logger = require("../utils/logger");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

const connectDB = async () => {
  try {
    await pool.connect();
    logger.info("Database connected successfully");
  } catch (error) {
    logger.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };
