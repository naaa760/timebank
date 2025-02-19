const { pool } = require("./db");
const User = require("../models/User");
const Service = require("../models/Service");
const Transaction = require("../models/Transaction");
const logger = require("../utils/logger");

const initializeDatabase = async () => {
  try {
    // Create tables in the correct order (due to foreign key constraints)
    await User.createTable();
    await Service.createTable();
    await Transaction.createTable();

    logger.info("Database tables initialized successfully");
  } catch (error) {
    logger.error("Database initialization failed:", error);
    process.exit(1);
  }
};

module.exports = initializeDatabase;
