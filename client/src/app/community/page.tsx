"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Users,
  TrendingUp,
  Search,
  Filter,
  PlusCircle,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { communityApi } from "@/lib/api/community";

interface Discussion {
  id: string;
  title: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: Date;
  isSticky?: boolean;
  content: string;
}

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "active">(
    "latest"
  );
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  const categories = [
    { id: "general", name: "General Discussion", count: 156 },
    { id: "requests", name: "Service Requests", count: 89 },
    { id: "offers", name: "Service Offers", count: 67 },
    { id: "success", name: "Success Stories", count: 34 },
    { id: "support", name: "Support", count: 12 },
  ];

  // Add this useEffect to load discussions
  useEffect(() => {
    const loadDiscussions = async () => {
      try {
        setIsLoading(true);
        const data = await communityApi.getDiscussions();
        setDiscussions(data);
      } catch (error) {
        console.error("Failed to load discussions:", error);
        toast.error("Failed to load discussions");
      } finally {
        setIsLoading(false);
      }
    };

    loadDiscussions();
  }, []);

  // Update the getSortedPosts function to use discussions
  const getSortedPosts = useCallback(() => {
    let filteredPosts = [...discussions]; // Create a copy to avoid mutation

    // Category filter
    if (selectedCategory) {
      filteredPosts = filteredPosts.filter(
        (post) => post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query)
      );
    }

    // Sorting
    return filteredPosts.sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return b.lastActivity.getTime() - a.lastActivity.getTime();
        case "popular":
          return b.views - a.views;
        case "active":
          return b.replies - a.replies;
        default:
          return 0;
      }
    });
  }, [discussions, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Community</h1>
          <p className="text-muted-foreground">
            Connect, share, and learn from other time bankers
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
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
        </motion.div>

        {/* Main Forum Content */}
        <div className="md:col-span-3 space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="animate-pulse"
                >
                  <div className="h-24 bg-gray-100 rounded-lg"></div>
                </motion.div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
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

                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-lime-50 cursor-pointer transition-all">
                    <span className="text-lime-700 mr-2">Sort by</span>
                    <ChevronDown className="h-4 w-4 text-lime-600" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSortBy("latest")}>
                      Latest
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("popular")}>
                      Most Popular
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("active")}>
                      Most Active
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={sortBy}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {getSortedPosts().length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 text-gray-500"
                    >
                      No discussions found
                    </motion.div>
                  ) : (
                    getSortedPosts().map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div
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
                      </motion.div>
                    ))
                  )}
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
