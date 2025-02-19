"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Users,
  TrendingUp,
  Search,
  Filter,
  PlusCircle,
} from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  // Filter posts based on search and category
  const filteredPosts = forumPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
        <div className="flex items-center space-x-6">
          <Link
            href="/community/chat"
            className="group flex items-center px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-lime-50 transition-all"
          >
            <MessageSquare className="h-4 w-4 mr-2 text-lime-600" />
            <span className="text-lime-700">Open Chat</span>
          </Link>

          <Link
            href="/community/new"
            className="group flex items-center px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-lime-50 transition-all"
          >
            <PlusCircle className="h-4 w-4 mr-2 text-lime-600" />
            <span className="text-lime-700">New Discussion</span>
          </Link>
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
              <div className="space-y-1">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex items-center justify-between w-full px-4 py-2 rounded-lg cursor-pointer transition-all group
                      ${
                        selectedCategory === category.name
                          ? "bg-lime-50"
                          : "hover:bg-lime-50/50"
                      }`}
                  >
                    <span
                      className={`${
                        selectedCategory === category.name
                          ? "text-lime-700"
                          : "text-gray-600 group-hover:text-lime-700"
                      }`}
                    >
                      {category.name}
                    </span>
                    <span className="text-sm text-gray-400 bg-white/80 px-2 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Forum Content */}
        <div className="md:col-span-3 space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-24 bg-gray-100 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Search and Filters */}
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search discussions..."
                    className="pl-9 bg-white/50 backdrop-blur-sm border-gray-200 focus:border-lime-500 transition-all"
                  />
                </div>
                <div
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-lime-50 cursor-pointer transition-all"
                >
                  <Filter className="h-4 w-4 mr-2 text-lime-600" />
                  <span className="text-lime-700">Filter</span>
                </div>
              </div>

              {/* Forum Posts */}
              <div className="space-y-4">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No discussions found
                  </div>
                ) : (
                  filteredPosts.map((post) => (
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
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
