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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { createService, type ServiceFormData } from "@/lib/api";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const categories = [
  "Technology",
  "Education",
  "Home & Garden",
  "Health & Wellness",
  "Arts & Crafts",
  "Business",
  "Other",
];

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
  const [validationState, setValidationState] = useState({
    title: true,
    description: true,
    duration: true,
  });
  const [isPreview, setIsPreview] = useState(false);

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

      const serviceData: ServiceFormData = {
        ...formData,
        tags,
        provider: {
          id: user.id,
          name: user.fullName || "Anonymous",
          avatar: user.imageUrl,
          rating: 0,
        },
      };

      await createService(serviceData);
      toast.success("Service offered successfully!");
      setIsDirty(false);
      router.push("/services");
    } catch (error) {
      console.error("Error submitting service:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to offer service"
      );
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

  function ServicePreview({ data }: { data: ServiceFormData }) {
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
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {isPreview ? (
        <>
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
          <div className="mt-6 flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPreview(false)}
              className="border-lime-500/20 hover:bg-lime-50"
            >
              Edit
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-lime-500 hover:bg-lime-600"
            >
              {isSubmitting ? "Offering..." : "Offer Service"}
            </Button>
          </div>
        </>
      ) : (
        <Card className="bg-white/50 backdrop-blur-sm border-lime-500/20">
          <CardHeader>
            <CardTitle>Offer a Service</CardTitle>
            <CardDescription>
              Share your skills with the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Service Title*</label>
                <Input
                  required
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Professional Web Development"
                  className={`border-lime-500/20 focus:border-lime-500/30 ${
                    validationState.title ? "" : "border-red-500"
                  }`}
                  maxLength={100}
                />
                {!validationState.title && (
                  <p className="text-xs text-red-500">
                    Title must be at least 5 characters
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category*</label>
                <Select
                  required
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger className="border-lime-500/20 focus:border-lime-500/30">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description*</label>
                <Textarea
                  required
                  name="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe your service in detail..."
                  className={`min-h-[100px] border-lime-500/20 focus:border-lime-500/30 ${
                    validationState.description ? "" : "border-red-500"
                  }`}
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.description.length}/500 characters
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Duration (hours)*</label>
                <Input
                  required
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  min="0.5"
                  step="0.5"
                  className={`border-lime-500/20 focus:border-lime-500/30 ${
                    validationState.duration ? "" : "border-red-500"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tags (optional)</label>
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Type and press Enter to add tags"
                  className="border-lime-500/20 focus:border-lime-500/30"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-lime-50 text-lime-700 rounded-full text-sm flex items-center"
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
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="border-lime-500/20 hover:bg-lime-50"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsPreview(!isPreview)}
                  className="border-lime-500/20 hover:bg-lime-50"
                >
                  {isPreview ? "Edit" : "Preview"}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-lime-500 hover:bg-lime-600"
                >
                  {isSubmitting ? "Offering..." : "Offer Service"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
