const { Pool } = require("pg");
const logger = require("../utils/logger");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    await client.query("SELECT NOW()");
    client.release();
    logger.info("Database connected successfully");
  } catch (error) {
    logger.error("Database connection failed - Full error:", error);
    logger.error("Connection string:", process.env.DATABASE_URL);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };
