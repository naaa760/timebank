import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  bio: string;
  timeCredits: number;
  joinedDate: Date;
}

export interface Transaction {
  id: string;
  type: "earned" | "spent";
  amount: number;
  service: string;
  with: {
    id: string;
    name: string;
    avatar?: string;
  };
  date: Date;
  status: "completed" | "pending" | "cancelled";
}

export interface Service {
  id: string;
  title: string;
  provider: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
  };
  category: string;
  hoursPerSession: number;
  description: string;
  tags: string[];
}

export interface Notification {
  id: string;
  type: "transaction" | "service" | "message" | "system";
  title: string;
  message: string;
  date: Date;
  read: boolean;
  actionUrl?: string;
}

// Add new service interface and API function
export interface ServiceFormData {
  title: string;
  category: string;
  description: string;
  duration: string;
  tags: string[];
  provider: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
}

// Update mock data to match interfaces
const mockData = {
  profile: {
    id: "1",
    name: "John Doe",
    bio: "Passionate about helping others and learning new skills",
    timeCredits: 25.5,
    joinedDate: new Date("2024-01-01"),
    avatar: "/avatars/john.jpg",
  },
  transactions: [
    {
      id: "1",
      type: "earned" as const,
      amount: 2,
      service: "Web Development",
      with: {
        id: "2",
        name: "Jane Smith",
        avatar: "/avatars/jane.jpg",
      },
      date: new Date(),
      status: "completed" as const,
    },
    {
      id: "2",
      type: "spent" as const,
      amount: 1.5,
      service: "Gardening Tips",
      with: {
        id: "3",
        name: "Mike Johnson",
        avatar: "/avatars/mike.jpg",
      },
      date: new Date(),
      status: "completed" as const,
    },
  ],
  services: [
    {
      id: "1",
      title: "Web Development",
      provider: {
        id: "1",
        name: "John Doe",
        avatar: "/avatars/john.jpg",
        rating: 4.8,
      },
      category: "Technology",
      hoursPerSession: 2,
      description:
        "Professional web development services using modern technologies",
      tags: ["React", "Next.js", "TypeScript", "Frontend", "Backend"],
    },
    {
      id: "2",
      title: "Gardening Consultation",
      provider: {
        id: "3",
        name: "Mike Johnson",
        avatar: "/avatars/mike.jpg",
        rating: 4.9,
      },
      category: "Home & Garden",
      hoursPerSession: 1,
      description: "Expert gardening advice and plant care tips",
      tags: ["Gardening", "Plants", "Landscaping", "Organic"],
    },
  ],
  notifications: [
    {
      id: "1",
      type: "service" as const,
      title: "New Service Request",
      message: "Jane Smith requested your Web Development service",
      date: new Date(),
      read: false,
      actionUrl: "/services/requests/1",
    },
  ],
};

// Update fetch functions to include error handling
export const fetchUserProfile = async (): Promise<UserProfile> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockData.profile;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw new Error("Failed to fetch profile");
  }
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockData.transactions;
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
};

export const fetchServices = async (): Promise<Service[]> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockData.services;
  } catch (error) {
    console.error("Failed to fetch services:", error);
    throw new Error("Failed to fetch services");
  }
};

export const fetchNotifications = async (): Promise<Notification[]> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockData.notifications;
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    throw new Error("Failed to fetch notifications");
  }
};

export const createService = async (
  data: ServiceFormData
): Promise<Service> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newService: Service = {
      id: `service-${Date.now()}`,
      title: data.title,
      provider: {
        id: data.provider.id,
        name: data.provider.name,
        avatar: data.provider.avatar || "/avatars/default.jpg",
        rating: data.provider.rating,
      },
      category: data.category,
      hoursPerSession: parseFloat(data.duration),
      description: data.description,
      tags: data.tags,
    };
    mockData.services.push(newService);
    return newService;
  } catch (error) {
    console.error("Failed to create service:", error);
    throw new Error("Failed to create service");
  }
};
