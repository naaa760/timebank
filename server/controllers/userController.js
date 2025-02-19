const User = require("../models/User");
const ApiResponse = require("../utils/apiResponse");
const logger = require("../utils/logger");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return ApiResponse.error(res, "User not found", 404);
    }
    return ApiResponse.success(res, user);
  } catch (error) {
    logger.error("Get profile error:", error);
    return ApiResponse.error(res, "Failed to fetch profile");
  }
};

const updateProfile = async (req, res) => {
  try {
    const { bio, skills } = req.body;
    const user = await User.update(req.user.id, { bio, skills });
    return ApiResponse.success(res, user, "Profile updated successfully");
  } catch (error) {
    logger.error("Update profile error:", error);
    return ApiResponse.error(res, "Failed to update profile");
  }
};

const getTimeBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return ApiResponse.error(res, "User not found", 404);
    }
    return ApiResponse.success(res, { timeCredits: user.time_credits });
  } catch (error) {
    logger.error("Get time balance error:", error);
    return ApiResponse.error(res, "Failed to fetch time balance");
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getTimeBalance,
};
