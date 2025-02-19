import { ChatMessage } from "@/types/chat";

interface WebSocketMessage {
  type: "message" | "reaction";
  message?: ChatMessage;
  messageId?: string;
  emoji?: string;
}

class ChatWebSocket {
  private ws: WebSocket | null = null;
  private messageHandlers: ((message: WebSocketMessage) => void)[] = [];

  connect() {
    this.ws = new WebSocket(
      process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:5000"
    );

    this.ws.onopen = () => {
      console.log("WebSocket connected");
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.messageHandlers.forEach((handler) => handler(data));
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.ws.onclose = () => {
      console.log("WebSocket disconnected");
      // Attempt to reconnect after 5 seconds
      setTimeout(() => this.connect(), 5000);
    };
  }

  sendMessage(message: WebSocketMessage) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  onMessage(handler: (message: WebSocketMessage) => void) {
    this.messageHandlers.push(handler);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const chatWebSocket = new ChatWebSocket();
