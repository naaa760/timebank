import axios from "axios";
import { Discussion, Reply } from "@/types/discussion";

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
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface ServiceFormData {
  title: string;
  description: string;
  category: string;
  hoursPerSession: number;
  tags: string[];
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

// Export the Service interface so other components can use it
export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  hoursPerSession: number;
  tags: string[];
  provider: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
  };
}

// Add some initial mock services that will be shown by default
const initialMockServices: Service[] = [
  {
    id: "1",
    title: "Web Development",
    description: "Professional web development services",
    category: "Technology",
    hoursPerSession: 2,
    tags: ["React", "Next.js"],
    provider: {
      id: "user1",
      name: "John Doe",
      avatar: "/avatars/default.jpg",
      rating: 4.8,
    },
  },
];

const getStoredServices = (): Service[] => {
  if (typeof window === "undefined") return initialMockServices;
  const stored = localStorage.getItem("timebank_services");
  return stored ? JSON.parse(stored) : initialMockServices;
};

let mockServices: Service[] = getStoredServices();

// Add these interfaces
export interface BookingFormData {
  serviceId: string;
  date: Date;
  timeSlot: string;
}

// Add mock bookings array
const mockBookings: BookingFormData[] = [];

// Add this at the top with other mock data
const mockReplies = new Map<string, Reply[]>();

export const communityApi = {
  // Discussions
  getDiscussions: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockDiscussions;
  },

  getDiscussion: async (id: string): Promise<Discussion> => {
    // Mock data for development
    const discussion = {
      id,
      title: "Sample Discussion",
      content: "This is a sample discussion content...",
      author: {
        name: "John Doe",
        avatar: "/avatars/john.jpg",
      },
      category: "general",
      replies: mockReplies.get(id) || [],
      views: 0,
      lastActivity: new Date(),
      isSticky: false,
      createdAt: new Date(),
    };
    return discussion;
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
    const reply: Reply = {
      id: `reply-${Date.now()}`,
      content: replyData.content,
      author: replyData.author,
      createdAt: new Date(),
      likes: 0,
    };

    const discussionReplies = mockReplies.get(replyData.discussionId) || [];
    mockReplies.set(replyData.discussionId, [...discussionReplies, reply]);

    return reply;
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

  // Add these methods for services
  getServices: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    mockServices = getStoredServices();
    return mockServices;
  },

  createService: async (serviceData: ServiceFormData) => {
    const newService: Service = {
      id: `service-${Date.now()}`,
      title: serviceData.title,
      description: serviceData.description,
      category: serviceData.category,
      hoursPerSession: serviceData.hoursPerSession,
      tags: serviceData.tags,
      provider: {
        id: "current-user",
        name: "Current User",
        avatar: "/avatars/default.jpg",
        rating: 5.0,
      },
    };

    const currentServices = getStoredServices();
    const updatedServices = [...currentServices, newService];
    localStorage.setItem("timebank_services", JSON.stringify(updatedServices));
    mockServices = updatedServices;

    return newService;
  },

  // Add booking methods
  createBooking: async (bookingData: BookingFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newBooking = {
      id: `booking-${Date.now()}`,
      ...bookingData,
      status: "pending",
      createdAt: new Date(),
    };
    mockBookings.push(newBooking);
    return newBooking;
  },

  getBookings: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockBookings;
  },

  incrementViews: async (discussionId: string) => {
    const response = await fetch(
      `/api/community/discussions/${discussionId}/views`,
      {
        method: "POST",
      }
    );
    return response.json();
  },

  likeReply: async (replyId: string) => {
    // Find and update the reply's likes
    mockReplies.forEach((replies, discussionId) => {
      const updatedReplies = replies.map((reply) => {
        if (reply.id === replyId) {
          return { ...reply, likes: (reply.likes || 0) + 1 };
        }
        return reply;
      });
      mockReplies.set(discussionId, updatedReplies);
    });
    return { success: true };
  },

  unlikeReply: async (replyId: string) => {
    // Find and update the reply's likes
    mockReplies.forEach((replies, discussionId) => {
      const updatedReplies = replies.map((reply) => {
        if (reply.id === replyId) {
          return { ...reply, likes: Math.max(0, (reply.likes || 0) - 1) };
        }
        return reply;
      });
      mockReplies.set(discussionId, updatedReplies);
    });
    return { success: true };
  },

  reportDiscussion: async (discussionId: string) => {
    const response = await fetch(
      `/api/community/discussions/${discussionId}/report`,
      {
        method: "POST",
      }
    );
    return response.json();
  },
};
