const express = require("express");
const { body } = require("express-validator");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const {
  getProfile,
  updateProfile,
  getTimeBalance,
} = require("../controllers/userController");

const router = express.Router();

router.get("/profile", protect, getProfile);
router.get("/balance", protect, getTimeBalance);

router.patch(
  "/profile",
  protect,
  [body("bio").optional().trim(), body("skills").optional().isArray()],
  validate,
  updateProfile
);

module.exports = router;
