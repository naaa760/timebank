export interface Reply {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  likes: number;
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  replies: Reply[];
  views: number;
  lastActivity: Date;
  isSticky: boolean;
  createdAt: Date;
}
