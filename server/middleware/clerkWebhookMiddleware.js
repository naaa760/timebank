const crypto = require("crypto");
const logger = require("../utils/logger");

const verifyClerkWebhook = (req, res, next) => {
  const svix_id = req.headers["svix-id"];
  const svix_timestamp = req.headers["svix-timestamp"];
  const svix_signature = req.headers["svix-signature"];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    logger.error("Missing Clerk webhook headers");
    return res.status(400).json({ error: "Missing headers" });
  }

  // Verify webhook (you can add this later when setting up Clerk webhooks)
  next();
};

module.exports = verifyClerkWebhook;
