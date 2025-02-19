const WebSocket = require("ws");
const logger = require("../utils/logger");

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    logger.info("New WebSocket connection");

    ws.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString()); // Convert Buffer to string
        logger.info("Received message:", message);

        if (message.type === "message" && message.message) {
          // Broadcast to all clients
          const broadcastMessage = JSON.stringify({
            type: "message",
            message: {
              id: message.message.id,
              content: message.message.content,
              sender: message.message.sender,
              timestamp: message.message.timestamp,
              status: message.message.status,
              edited: message.message.edited,
            },
          });

          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(broadcastMessage);
            }
          });
        }
      } catch (error) {
        logger.error("WebSocket message error:", error);
      }
    });

    ws.on("close", () => {
      logger.info("Client disconnected");
    });
  });

  return wss;
}

module.exports = setupWebSocket;
