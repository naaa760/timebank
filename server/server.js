require("dotenv").config();
console.log("Database URL:", process.env.DATABASE_URL);
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const logger = require("./utils/logger");
const errorHandler = require("./middleware/errorHandler");
const initializeDatabase = require("./config/initDb");
const ApiResponse = require("./utils/apiResponse");
const limiter = require("./middleware/rateLimiter");
const requestLogger = require("./middleware/requestLogger");
const http = require("http");
const setupWebSocket = require("./websocket/chatHandler");

const app = express();

// Wrap the initialization in an async function
const startServer = async () => {
  try {
    // Connect to Database
    await connectDB();

    // Initialize Database
    await initializeDatabase();

    // Middleware
    app.use(
      cors({
        origin: process.env.FRONTEND_URL || PORT,
        credentials: true,
      })
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Add before routes
    app.use(limiter);
    app.use(requestLogger);

    // Routes
    app.use("/api/auth", require("./routes/auth"));
    app.use("/api/services", require("./routes/services"));
    app.use("/api/transactions", require("./routes/transactions"));
    app.use("/api/users", require("./routes/users"));

    // Add before the error handler
    app.use((req, res) => {
      return ApiResponse.error(res, "Route not found", 404);
    });

    // Error Handler
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;

    // Create HTTP server
    const server = http.createServer(app);

    // Setup WebSocket
    setupWebSocket(server);

    // Try to start server with error handling
    server
      .listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
      })
      .on("error", (err) => {
        if (err.code === "EADDRINUSE") {
          logger.error(`Port ${PORT} is already in use. Trying ${PORT + 1}`);
          server.listen(PORT + 1);
        } else {
          logger.error("Server error:", err);
          process.exit(1);
        }
      });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection:", err);
  process.exit(1);
});
