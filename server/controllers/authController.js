const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiResponse = require("../utils/apiResponse");
const logger = require("../utils/logger");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findByEmail(email);
    if (userExists) {
      return ApiResponse.error(res, "User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return ApiResponse.success(
      res,
      { user, token },
      "User registered successfully"
    );
  } catch (error) {
    logger.error("Register error:", error);
    return ApiResponse.error(res, "Registration failed");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return ApiResponse.error(res, "Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return ApiResponse.error(res, "Invalid credentials", 401);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return ApiResponse.success(res, { user, token }, "Login successful");
  } catch (error) {
    logger.error("Login error:", error);
    return ApiResponse.error(res, "Login failed");
  }
};

module.exports = { register, login };
