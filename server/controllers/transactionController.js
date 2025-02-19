const Transaction = require("../models/Transaction");
const User = require("../models/User");
const ApiResponse = require("../utils/apiResponse");
const logger = require("../utils/logger");

const createTransaction = async (req, res) => {
  try {
    const { serviceId, toUserId, amount, type } = req.body;
    const fromUserId = req.user.id;

    // Create transaction
    const transaction = await Transaction.create({
      serviceId,
      fromUserId,
      toUserId,
      amount,
      type,
    });

    // Update user time credits
    if (type === "transfer") {
      await User.updateTimeCredits(fromUserId, -amount);
      await User.updateTimeCredits(toUserId, amount);
    }

    return ApiResponse.success(
      res,
      transaction,
      "Transaction created successfully"
    );
  } catch (error) {
    logger.error("Create transaction error:", error);
    return ApiResponse.error(res, "Failed to create transaction");
  }
};

const getUserTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await Transaction.getUserTransactions(userId);
    return ApiResponse.success(res, transactions);
  } catch (error) {
    logger.error("Get user transactions error:", error);
    return ApiResponse.error(res, "Failed to fetch transactions");
  }
};

module.exports = {
  createTransaction,
  getUserTransactions,
};
