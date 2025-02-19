const express = require("express");
const { body } = require("express-validator");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const {
  createService,
  getServices,
  getProviderServices,
} = require("../controllers/serviceController");

const router = express.Router();

router.post(
  "/",
  protect,
  [
    body("title").notEmpty().trim(),
    body("description").notEmpty(),
    body("category").notEmpty(),
    body("hoursPerSession").isFloat({ min: 0.5 }),
    body("tags").isArray(),
  ],
  validate,
  createService
);

router.get("/", getServices);
router.get("/provider/:providerId", getProviderServices);

module.exports = router;
