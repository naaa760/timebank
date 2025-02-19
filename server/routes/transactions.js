const express = require("express");
const { body } = require("express-validator");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const {
  createTransaction,
  getUserTransactions,
} = require("../controllers/transactionController");

const router = express.Router();

router.post(
  "/",
  protect,
  [
    body("serviceId").isInt(),
    body("toUserId").isInt(),
    body("amount").isFloat({ min: 0.1 }),
    body("type").isIn(["transfer"]),
  ],
  validate,
  createTransaction
);

router.get("/", protect, getUserTransactions);

module.exports = router;
