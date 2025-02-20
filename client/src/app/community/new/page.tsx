"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { communityApi } from "@/lib/api/community";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function NewDiscussionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });

  const categories = [
    { id: "general", name: "General Discussion", icon: "💭", color: "blue" },
    { id: "requests", name: "Service Requests", icon: "🤝", color: "purple" },
    { id: "offers", name: "Service Offers", icon: "🎁", color: "emerald" },
    { id: "success", name: "Success Stories", icon: "⭐", color: "amber" },
    { id: "support", name: "Support", icon: "💡", color: "rose" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await communityApi.createDiscussion({
        title: formData.title,
        category: formData.category,
        content: formData.content,
      });

      toast.success("Discussion created successfully!");
      router.push("/community");
    } catch (error) {
      console.error("Failed to create discussion:", error);
      toast.error("Failed to create discussion. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <Link
        href="/community"
        className="inline-flex items-center text-lime-600 hover:text-lime-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Discussions
      </Link>

      <Card className="max-w-2xl mx-auto p-8 bg-white/50 backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-lime-600 to-emerald-600 bg-clip-text text-transparent">
          Start a New Discussion
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Title
            </label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter discussion title"
              className="bg-white/50 border-gray-200 focus:border-lime-500 focus:ring-lime-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 text-gray-700">
              Category
            </label>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  onClick={() =>
                    setFormData({ ...formData, category: category.id })
                  }
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                    formData.category === category.id
                      ? `bg-${category.color}-500 text-white shadow-lg`
                      : `bg-${category.color}-50 text-${category.color}-700 hover:bg-${category.color}-100`
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Content
            </label>
            <Textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="Write your discussion content..."
              className="min-h-[200px] bg-white/50 border-gray-200 focus:border-lime-500 focus:ring-lime-500"
              required
            />
          </div>

          <div className="flex justify-end pt-4">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-8 py-3 rounded-xl bg-gradient-to-r from-lime-500 to-emerald-500 
                text-white font-medium shadow-lg hover:shadow-xl 
                transition-all duration-300 ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:from-lime-600 hover:to-emerald-600"
                }`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  Creating...
                </div>
              ) : (
                "Create Discussion"
              )}
            </motion.button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
