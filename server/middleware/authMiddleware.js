const jwt = require("jsonwebtoken");
const ApiResponse = require("../utils/apiResponse");
const logger = require("../utils/logger");

const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return ApiResponse.error(res, "Not authorized, no token", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error("Auth middleware error:", error);
    return ApiResponse.error(res, "Not authorized, token failed", 401);
  }
};

module.exports = { protect };
