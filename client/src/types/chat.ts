export interface ChatMessage {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  status?: "sent" | "delivered" | "read";
  edited: boolean;
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
