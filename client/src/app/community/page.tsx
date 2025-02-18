"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Users,
  TrendingUp,
  Search,
  Filter,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ForumPost {
  id: string;
  title: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: Date;
  isSticky?: boolean;
}

export default function CommunityPage() {
  const [] = useState("forum");

  const forumPosts: ForumPost[] = [
    {
      id: "1",
      title: "Tips for new time bankers",
      author: "Sarah Wilson",
      category: "General Discussion",
      replies: 23,
      views: 156,
      lastActivity: new Date("2024-03-20"),
      isSticky: true,
    },
    {
      id: "2",
      title: "Looking for web development mentorship",
      author: "Mike Chen",
      category: "Service Requests",
      replies: 5,
      views: 45,
      lastActivity: new Date("2024-03-19"),
    },
  ];

  const categories = [
    { id: "general", name: "General Discussion", count: 156 },
    { id: "requests", name: "Service Requests", count: 89 },
    { id: "offers", name: "Service Offers", count: 67 },
    { id: "success", name: "Success Stories", count: 34 },
    { id: "support", name: "Support", count: 12 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Community</h1>
          <p className="text-muted-foreground">
            Connect, share, and learn from other time bankers
          </p>
        </div>
        <div className="space-x-4">
          <Button variant="outline" asChild>
            <Link href="/community/chat">
              <MessageSquare className="h-4 w-4 mr-2" />
              Open Chat
            </Link>
          </Button>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Discussion
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Sidebar - Categories */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors flex justify-between items-center"
                  >
                    <span>{category.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Forum Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Search and Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search discussions..." className="pl-9" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Forum Posts */}
          <div className="space-y-4">
            {forumPosts.map((post) => (
              <div
                key={post.id}
                className={`p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow ${
                  post.isSticky ? "border-l-4 border-primary" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">
                      {post.isSticky && (
                        <span className="text-primary mr-2">📌</span>
                      )}
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Posted by {post.author} in {post.category}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
