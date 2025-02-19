"use client";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CommunityPost {
  id: string;
  title: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  replies: number;
  views: number;
  lastActivity: Date;
}

export default function CommunityActivity() {
  // Mock data - would come from context
  const posts: CommunityPost[] = [
    {
      id: "1",
      title: "Tips for new time bankers",
      author: {
        name: "Sarah Wilson",
      },
      category: "General Discussion",
      replies: 23,
      views: 156,
      lastActivity: new Date("2024-03-20"),
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Community Activity</CardTitle>
          <CardDescription>Recent discussions and updates</CardDescription>
        </div>
        <Button asChild variant="outline">
          <Link href="/community">
            <MessageSquare className="h-4 w-4 mr-2" />
            View All
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/community/forum/${post.id}`}
              className="block"
            >
              <div className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Posted by {post.author.name} in {post.category}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {post.replies}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {post.views}
                    </span>
                    <span className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
