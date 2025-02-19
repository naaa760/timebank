const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const {
  createAppointment,
  getUserAppointments,
} = require("../controllers/appointmentController");

const router = express.Router();

router.post(
  "/",
  [
    body("serviceId").isInt(),
    body("date").isISO8601(),
    body("timeSlot").notEmpty(),
    body("providerId").notEmpty(),
    body("duration").isFloat({ min: 0.5 }),
    body("userId").notEmpty(),
  ],
  validate,
  createAppointment
);

router.get("/", getUserAppointments);

module.exports = router;
