"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    { id: "general", name: "General Discussion" },
    { id: "requests", name: "Service Requests" },
    { id: "offers", name: "Service Offers" },
    { id: "success", name: "Success Stories" },
    { id: "support", name: "Support" },
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

      <Card className="max-w-2xl mx-auto p-6 bg-white/50 backdrop-blur-sm">
        <h1 className="text-2xl font-bold mb-6">Start a New Discussion</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter discussion title"
              className="bg-white/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger className="bg-white/50">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <Textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="Write your discussion content..."
              className="min-h-[200px] bg-white/50"
              required
            />
          </div>

          <div className="flex justify-end">
            <div
              onClick={handleSubmit}
              className={`inline-flex items-center px-6 py-2 rounded-full bg-lime-500 text-white hover:bg-lime-600 transition-colors cursor-pointer ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Creating..." : "Create Discussion"}
            </div>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
