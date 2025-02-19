export interface ChatMessage {
  edited: boolean | Date;
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  status?: "sent" | "delivered" | "read";
  reactions?: {
    emoji: string;
    users: string[];
  }[];
}

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  status: "online" | "offline" | "away";
  lastSeen?: Date;
}
