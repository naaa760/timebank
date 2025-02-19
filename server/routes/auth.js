const express = require("express");
const { body } = require("express-validator");
const { register, login } = require("../controllers/authController");
const validate = require("../middleware/validate");
const User = require("../models/User");
const logger = require("../utils/logger");
const ApiResponse = require("../utils/apiResponse");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().trim(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  validate,
  register
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  validate,
  login
);

// Update the sync-user route with more logging
router.post("/sync-user", async (req, res) => {
  try {
    const { clerkUserId, email, name } = req.body;

    logger.info("Received sync request:", { clerkUserId, email, name });

    if (!clerkUserId || !email || !name) {
      logger.error("Missing required fields:", { clerkUserId, email, name });
      return ApiResponse.error(res, "Missing required fields", 400);
    }

    // Check if user already exists
    let user = await User.findByClerkId(clerkUserId);
    logger.info("Existing user check:", { exists: !!user });

    if (!user) {
      // Create new user if doesn't exist
      const userData = {
        clerk_id: clerkUserId,
        name,
        email,
        password: null,
      };
      logger.info("Creating new user with data:", userData);

      user = await User.create(userData);
      logger.info("New user created:", user);
    }

    return ApiResponse.success(res, { user }, "User synced successfully");
  } catch (error) {
    logger.error("User sync error:", error);
    return ApiResponse.error(res, error.message, 500);
  }
});

module.exports = router;
