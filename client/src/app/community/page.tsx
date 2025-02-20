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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "active">(
    "latest"
  );
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [filters, setFilters] = useState({
    category: new Set<string>(),
    sortBy: "latest", // "latest" | "popular" | "active"
    timeFrame: new Set<string>(),
  });

  const categories = [
    { id: "general", name: "General Discussion", count: 156 },
    { id: "requests", name: "Service Requests", count: 89 },
    { id: "offers", name: "Service Offers", count: 67 },
    { id: "success", name: "Success Stories", count: 34 },
    { id: "support", name: "Support", count: 12 },
  ];

  const timeFrames = ["Today", "This Week", "This Month", "All Time"];

  const toggleFilter = (type: "category" | "timeFrame", value: string) => {
    setFilters((prev) => {
      const updated = new Set(prev[type]);
      if (updated.has(value)) {
        updated.delete(value);
      } else {
        updated.add(value);
      }
      return { ...prev, [type]: updated };
    });
  };

  // Add this useEffect to load discussions
  useEffect(() => {
    const loadDiscussions = async () => {
      try {
        const data = await communityApi.getDiscussions();
        setDiscussions(data);
      } catch (error) {
        console.error("Failed to load discussions:", error);
        toast.error("Failed to load discussions");
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
    <div className="min-h-screen relative">
      {/* Base background layer */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundColor: "#dcfce7", // Light green background
          opacity: 0.95,
        }}
      />

      {/* Gradient overlay */}
      <div
        className="fixed inset-0 z-0 mix-blend-overlay opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(22, 163, 74, 0.15), rgba(236, 252, 203, 0.3))",
        }}
      />

      {/* Dark green grain effect */}
      <div
        className="fixed inset-0 z-0 mix-blend-soft-light opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4' style='fill:%23166534'/%3E%3C/svg%3E\")",
          filter: "contrast(120%)",
        }}
      />

      {/* Content wrapper with enhanced shadows */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Animated hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-lime-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Community Hub
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join conversations, share experiences, and connect with fellow time
            bankers
          </p>
        </motion.div>

        {/* Enhanced card styling */}
        <div
          className={`bg-white/90 backdrop-blur-md rounded-2xl p-8 
            border border-green-100/30
            shadow-[0_8px_30px_rgba(22,163,74,0.1),0_4px_10px_rgba(22,163,74,0.05),inset_0_0_80px_rgba(255,255,255,0.5)] 
            hover:shadow-[0_20px_40px_rgba(22,163,74,0.15),0_8px_15px_rgba(22,163,74,0.1),inset_0_0_100px_rgba(255,255,255,0.7)] 
            transition-all duration-500 ease-out`}
        >
          {/* Keep existing header section but add animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
          >
            {/* Keep existing header content but enhance buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/community/chat"
                className="group flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-lime-500/10 to-emerald-500/10 hover:from-lime-500/20 hover:to-emerald-500/20 transition-all duration-300"
              >
                <MessageSquare className="h-5 w-5 mr-2 text-lime-600 group-hover:scale-110 transition-transform" />
                <span className="text-lime-700">Live Chat</span>
              </Link>
              <Link
                href="/community/new"
                className="group flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <PlusCircle className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform" />
                <span>New Discussion</span>
              </Link>
            </div>
          </motion.div>

          {/* Enhanced Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white/40 p-4 rounded-xl backdrop-blur-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                    {(filters.category.size > 0 ||
                      filters.timeFrame.size > 0) && (
                      <span className="ml-2 w-5 h-5 rounded-full bg-lime-500 text-white text-xs flex items-center justify-center">
                        {filters.category.size + filters.timeFrame.size}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <div className="p-2">
                    <h4 className="mb-2 text-sm font-medium">Categories</h4>
                    {categories.map((category) => (
                      <DropdownMenuCheckboxItem
                        key={category.id}
                        checked={filters.category.has(category.id)}
                        onCheckedChange={() =>
                          toggleFilter("category", category.id)
                        }
                      >
                        {category.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </div>
                  <div className="border-t p-2">
                    <h4 className="mb-2 text-sm font-medium">Time Frame</h4>
                    {timeFrames.map((timeFrame) => (
                      <DropdownMenuCheckboxItem
                        key={timeFrame}
                        checked={filters.timeFrame.has(timeFrame)}
                        onCheckedChange={() =>
                          toggleFilter("timeFrame", timeFrame)
                        }
                      >
                        {timeFrame}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center space-x-4">
                <span className="text-gray-600 mr-2">Sort by:</span>
                <div className="flex space-x-4">
                  <span
                    onClick={() => setSortBy("latest")}
                    className={`cursor-pointer transition-colors ${
                      sortBy === "latest"
                        ? "text-lime-600 font-medium"
                        : "text-gray-600 hover:text-lime-600"
                    }`}
                  >
                    Latest
                  </span>
                  <span
                    onClick={() => setSortBy("popular")}
                    className={`cursor-pointer transition-colors ${
                      sortBy === "popular"
                        ? "text-lime-600 font-medium"
                        : "text-gray-600 hover:text-lime-600"
                    }`}
                  >
                    Most Popular
                  </span>
                  <span
                    onClick={() => setSortBy("active")}
                    className={`cursor-pointer transition-colors ${
                      sortBy === "active"
                        ? "text-lime-600 font-medium"
                        : "text-gray-600 hover:text-lime-600"
                    }`}
                  >
                    Most Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Enhanced Categories Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
                          selectedCategory === category.name
                            ? "bg-gradient-to-r from-lime-500/20 to-emerald-500/20 shadow-md"
                            : "hover:bg-gradient-to-r hover:from-lime-500/10 hover:to-emerald-500/10"
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

            {/* Enhanced Discussion List */}
            <div className="lg:col-span-3 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={sortBy + selectedCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {getSortedPosts().map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <Link href={`/community/discussion/${post.id}`}>
                        <div
                          className={`p-6 bg-white/95 backdrop-blur-sm rounded-xl 
                            border border-green-50/50
                            shadow-[0_4px_20px_rgba(22,163,74,0.06),inset_0_2px_8px_rgba(255,255,255,0.8)] 
                            hover:shadow-[0_8px_30px_rgba(22,163,74,0.12),0_4px_15px_rgba(22,163,74,0.08),inset_0_2px_12px_rgba(255,255,255,0.9)] 
                            hover:-translate-y-1 
                            transition-all duration-300 ease-in-out`}
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
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Updated grain animation */}
      <style jsx global>{`
        .grain {
          animation: grain 8s steps(10) infinite;
          background-repeat: repeat;
          opacity: 0.25;
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        @keyframes grain {
          0%,
          100% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-2%, -2%);
          }
          20% {
            transform: translate(-4%, 2%);
          }
          30% {
            transform: translate(2%, -4%);
          }
          40% {
            transform: translate(-2%, 6%);
          }
          50% {
            transform: translate(-4%, 2%);
          }
          60% {
            transform: translate(6%, 0%);
          }
          70% {
            transform: translate(0%, 4%);
          }
          80% {
            transform: translate(-6%, 0%);
          }
          90% {
            transform: translate(4%, 2%);
          }
        }
      `}</style>
    </div>
  );
}
