const logger = require("../utils/logger");
const ApiResponse = require("../utils/apiResponse");

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  if (err.name === "ValidationError") {
    return ApiResponse.error(res, "Validation Error", 400, err.errors);
  }

  if (err.name === "UnauthorizedError") {
    return ApiResponse.error(res, "Unauthorized", 401);
  }

  return ApiResponse.error(
    res,
    err.message || "Internal Server Error",
    err.statusCode || 500
  );
};

module.exports = errorHandler;
