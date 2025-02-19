import axios from "axios";

const api = axios.create({
  baseURL: "/api/community",
});

export interface CreateDiscussionData {
  title: string;
  content: string;
  category: string;
}

export interface CreateReplyData {
  discussionId: string;
  content: string;
}

// Add mock chat messages for testing
const mockMessages = [
  {
    id: "1",
    content: "Hello everyone!",
    sender: {
      id: "user1",
      name: "John Doe",
      avatar: "/avatars/john.jpg",
    },
    timestamp: new Date(),
    status: "read" as const,
    reactions: [],
    edited: false,
  },
  // Add more mock messages as needed
];

const mockDiscussions = [
  {
    id: "1",
    title: "Welcome to TimeBank Community",
    content: "This is our first discussion post...",
    author: "Admin",
    category: "General Discussion",
    replies: 0,
    views: 0,
    lastActivity: new Date(),
    isSticky: true,
  },
];

export const communityApi = {
  // Discussions
  getDiscussions: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockDiscussions;
  },

  getDiscussion: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockDiscussions.find((d) => d.id === id) || null;
  },

  createDiscussion: async (discussionData: CreateDiscussionData) => {
    const newDiscussion = {
      id: `discussion-${Date.now()}`,
      ...discussionData,
      author: "Current User",
      replies: 0,
      views: 0,
      lastActivity: new Date(),
      isSticky: false,
    };
    mockDiscussions.push(newDiscussion);
    return newDiscussion;
  },

  // Replies
  createReply: async (replyData: CreateReplyData) => {
    const { data } = await api.post("/replies", replyData);
    return data;
  },

  // Chat
  getChatMessages: async () => {
    // For testing, return mock messages
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockMessages;
  },

  sendChatMessage: async (message: string) => {
    const { data } = await api.post("/chat", { content: message });
    return data;
  },
};
