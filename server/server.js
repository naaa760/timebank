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
const PORT = process.env.PORT || 5000;

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
        origin:
          process.env.NODE_ENV === "production"
            ? process.env.FRONTEND_URL
            : "http://localhost:3000",
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

    // Create HTTP server
    const server = http.createServer(app);

    // Setup WebSocket
    setupWebSocket(server);

    // Try available ports starting from PORT
    const findAvailablePort = async (startPort) => {
      return new Promise((resolve, reject) => {
        const tryPort = (port) => {
          server
            .listen(port)
            .once("listening", () => {
              server.removeAllListeners("error");
              logger.info(
                `Server running in ${process.env.NODE_ENV} mode on port ${port}`
              );
              resolve(port);
            })
            .once("error", (err) => {
              server.removeAllListeners("listening");
              if (err.code === "EADDRINUSE") {
                logger.warn(`Port ${port} is in use, trying ${port + 1}`);
                tryPort(port + 1);
              } else {
                reject(err);
              }
            });
        };
        tryPort(startPort);
      });
    };

    await findAvailablePort(PORT);
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server
startServer().catch((error) => {
  logger.error("Server startup failed:", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection:", err);
  process.exit(1);
});
