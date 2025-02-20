"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";
import { communityApi } from "@/lib/api/community";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useDashboard } from "@/contexts/DashboardContext";
import { motion } from "framer-motion";

const categories = [
  {
    id: "Technology",
    name: "Technology",
    icon: "💻",
    color: "blue",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    id: "Education",
    name: "Education",
    icon: "📚",
    color: "purple",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "Home & Garden",
    name: "Home & Garden",
    icon: "🏡",
    color: "emerald",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "Health & Wellness",
    name: "Health & Wellness",
    icon: "🌿",
    color: "green",
    gradient: "from-green-500 to-lime-500",
  },
  {
    id: "Arts & Crafts",
    name: "Arts & Crafts",
    icon: "🎨",
    color: "amber",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "Business",
    name: "Business",
    icon: "💼",
    color: "slate",
    gradient: "from-slate-500 to-gray-500",
  },
  {
    id: "Other",
    name: "Other",
    icon: "✨",
    color: "rose",
    gradient: "from-rose-500 to-pink-500",
  },
];

interface ServicePreviewData {
  title: string;
  description: string;
  category: string;
  duration: string;
  tags: string[];
  provider: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
}

function ServicePreview({ data }: { data: ServicePreviewData }) {
  return (
    <Card className="bg-white/50 backdrop-blur-sm border-lime-500/20">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>
          {data.category} • {data.duration} hours per session
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {data.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-lime-50 text-lime-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Avatar className="h-8 w-8">
            <AvatarImage src={data.provider.avatar} />
            <AvatarFallback>{data.provider.name[0]}</AvatarFallback>
          </Avatar>
          <span>{data.provider.name}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function OfferServicePage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    duration: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [validationState, setValidationState] = useState<{
    title: boolean;
    description: boolean;
    duration: boolean;
  }>({
    title: true,
    description: true,
    duration: true,
  });
  const [isPreview, setIsPreview] = useState(false);
  const { dispatch } = useDashboard();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    if (
      formData.title ||
      formData.category ||
      formData.description ||
      formData.duration ||
      tags.length > 0
    ) {
      setIsDirty(true);
    }
  }, [formData, tags]);

  useEffect(() => {
    setValidationState({
      title: formData.title.length === 0 || formData.title.length >= 5,
      description:
        formData.description.length === 0 || formData.description.length >= 50,
      duration: !formData.duration || parseFloat(formData.duration) > 0,
    });
  }, [formData]);

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return false;
    }
    if (!formData.category) {
      toast.error("Category is required");
      return false;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return false;
    }
    if (!formData.duration || parseFloat(formData.duration) <= 0) {
      toast.error("Duration must be greater than 0");
      return false;
    }
    if (formData.description.length < 50) {
      toast.error("Description must be at least 50 characters");
      return false;
    }
    return true;
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();

      if (tags.length >= 5) {
        toast.error("Maximum 5 tags allowed");
        return;
      }
      if (tags.includes(newTag)) {
        toast.error("Tag already exists");
        return;
      }
      if (newTag.length > 20) {
        toast.error("Tag must be less than 20 characters");
        return;
      }
      if (!/^[a-zA-Z0-9-\s]+$/.test(newTag)) {
        toast.error(
          "Tags can only contain letters, numbers, spaces, and hyphens"
        );
        return;
      }

      setTags([...tags, newTag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      if (!isLoaded || !user) {
        throw new Error("Please sign in to offer a service");
      }

      const newService = await communityApi.createService({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        hoursPerSession: parseFloat(formData.duration),
        tags: tags,
      });

      dispatch({ type: "ADD_SERVICE", payload: newService });
      toast.success("Service offered successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to create service:", error);
      toast.error("Failed to create service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        )
      ) {
        router.back();
      }
    } else {
      router.back();
    }
  };

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="bg-white/50 backdrop-blur-sm border-lime-500/20">
          <CardHeader>
            <div className="h-6 w-48 bg-lime-100 animate-pulse rounded" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-10 bg-lime-50 animate-pulse rounded" />
              <div className="h-10 bg-lime-50 animate-pulse rounded" />
              <div className="h-32 bg-lime-50 animate-pulse rounded" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Beautiful background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-lime-50" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,255,200,0.2),transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(220,220,220,0.2),transparent_50%)]" />

      <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-lime-500 to-teal-500 bg-clip-text text-transparent 
            [text-shadow:_0_4px_20px_rgba(0,200,100,0.2)] tracking-tight"
          >
            Share Your Skills
          </h1>
          <p className="text-lg bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 bg-clip-text text-transparent">
            Offer your expertise to the community and make a difference
          </p>
        </motion.div>

        {isPreview ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="backdrop-blur-sm"
          >
            <ServicePreview
              data={{
                ...formData,
                tags,
                provider: {
                  id: user?.id || "",
                  name: user?.fullName || "Anonymous",
                  avatar: user?.imageUrl,
                  rating: 0,
                },
              }}
            />
          </motion.div>
        ) : (
          <Card
            className="bg-white/40 backdrop-blur-md border-0
              shadow-[0_8px_32px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.8)] 
              hover:shadow-[0_16px_48px_rgba(0,0,0,0.15),0_8px_24px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)]
              transition-all duration-500"
          >
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium mb-2 bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
                    Service Title*
                  </label>
                  <Input
                    required
                    name="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter service title"
                    className={`bg-white/50 ${
                      !validationState.title
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <label className="block text-sm font-medium bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
                    Category*
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {categories.map((category, index) => (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() =>
                          setFormData({ ...formData, category: category.id })
                        }
                        className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer 
                          backdrop-blur-sm transition-all duration-300 
                          shadow-[0_4px_12px_rgba(0,0,0,0.08)] 
                          hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] ${
                            formData.category === category.id
                              ? `bg-gradient-to-r ${category.gradient} text-white shadow-[0_6px_20px_rgba(0,0,0,0.15)]`
                              : "bg-white/40 hover:bg-white/60 text-gray-700"
                          }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-xl">{category.icon}</span>
                        <span>{category.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium mb-2 bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
                    Description*
                  </label>
                  <Textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe your service in detail..."
                    className={`min-h-[150px] bg-white/50 ${
                      !validationState.description
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium mb-2 bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
                    Duration (hours)*
                  </label>
                  <Input
                    required
                    type="number"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className={`bg-white/50 ${
                      !validationState.duration
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                    min="0.5"
                    step="0.5"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium mb-2 bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
                    Tags (optional)
                  </label>
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Type and press Enter to add tags"
                    className="bg-white/50 border-0 
                      shadow-[inset_0_2px_6px_rgba(0,0,0,0.12)] 
                      focus:ring-2 focus:ring-emerald-500/40 
                      focus:shadow-[inset_0_3px_8px_rgba(0,0,0,0.15)]"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white text-gray-700 rounded-full text-sm flex items-center"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-end space-x-4 pt-6"
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="border-emerald-200 hover:bg-emerald-50 text-emerald-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsPreview(!isPreview)}
                    className="bg-gradient-to-r from-emerald-400 to-lime-400 
                      hover:from-emerald-500 hover:to-lime-500 
                      text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] 
                      hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]
                      transition-all duration-300"
                  >
                    Preview
                  </Button>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-2 rounded-lg 
                      bg-gradient-to-r from-emerald-500 via-lime-500 to-teal-500
                      hover:from-emerald-600 hover:via-lime-600 hover:to-teal-600
                      text-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] 
                      hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] 
                      transition-all duration-300 
                      ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        <span>Creating...</span>
                      </div>
                    ) : (
                      "Create Service"
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
