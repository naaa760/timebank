import { MessageSquare, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CommunityPost {
  id: string;
  type: "discussion" | "announcement" | "question";
  title: string;
  author: string;
  replies: number;
  category: string;
  timeAgo: string;
}

export default function CommunityActivity() {
  const posts: CommunityPost[] = [
    {
      id: "1",
      type: "discussion",
      title: "Best practices for time banking",
      author: "Sarah Wilson",
      replies: 12,
      category: "General Discussion",
      timeAgo: "2 hours ago",
    },
    {
      id: "2",
      type: "question",
      title: "How to start teaching languages?",
      author: "Mike Chen",
      replies: 5,
      category: "Getting Started",
      timeAgo: "4 hours ago",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Community Activity</h3>
        <Link
          href="/community"
          className="text-sm text-primary hover:underline flex items-center"
        >
          Join Discussion
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium">{post.title}</h4>
                <p className="text-sm text-muted-foreground">
                  by {post.author} • {post.timeAgo}
                </p>
              </div>
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                {post.category}
              </span>
            </div>

            <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span>{post.replies} replies</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>Active Discussion</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <button className="p-2 text-sm text-center bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
          Start Discussion
        </button>
        <button className="p-2 text-sm text-center bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
          Ask Question
        </button>
      </div>
    </div>
  );
}
