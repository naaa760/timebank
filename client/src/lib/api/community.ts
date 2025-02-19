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

export const communityApi = {
  // Discussions
  getDiscussions: async () => {
    const { data } = await api.get("/discussions");
    return data;
  },

  getDiscussion: async (id: string) => {
    const { data } = await api.get(`/discussions/${id}`);
    return data;
  },

  createDiscussion: async (discussionData: CreateDiscussionData) => {
    const { data } = await api.post("/discussions", discussionData);
    return data;
  },

  // Replies
  createReply: async (replyData: CreateReplyData) => {
    const { data } = await api.post("/replies", replyData);
    return data;
  },

  // Chat
  getChatMessages: async () => {
    const { data } = await api.get("/chat");
    return data;
  },

  sendChatMessage: async (message: string) => {
    const { data } = await api.post("/chat", { content: message });
    return data;
  },
};
