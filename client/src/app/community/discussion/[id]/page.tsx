"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageSquare, ThumbsUp, Share, Flag } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { communityApi } from "@/lib/api/community";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Reply, Discussion } from "@/types/discussion";
import { useUser } from "@clerk/nextjs";

export default function DiscussionPage() {
  const { user } = useUser();
  const params = useParams();
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const loadDiscussion = useCallback(async () => {
    const id = params?.id;
    if (!id) return;

    setIsLoading(true);
    try {
      const data = await communityApi.getDiscussion(id as string);
      // Increment view count
      await communityApi.incrementViews(id as string);

      const discussionData: Discussion = {
        ...data,
        createdAt: new Date(data.lastActivity),
        replies:
          data.replies?.map((reply: Reply) => ({
            ...reply,
            createdAt: new Date(reply.createdAt),
          })) || [],
      };
      setDiscussion(discussionData);
    } catch (error) {
      console.error("Failed to load discussion:", error);
      toast.error("Failed to load discussion");
    } finally {
      setIsLoading(false);
    }
  }, [params?.id]);

  useEffect(() => {
    loadDiscussion();
  }, [params?.id, loadDiscussion]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to reply");
      return;
    }
    if (!replyContent.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }

    setIsSubmitting(true);
    try {
      await communityApi.createReply({
        discussionId: params?.id as string,
        content: replyContent,
        author: {
          id: user.id,
          name: user.fullName || "Anonymous",
          avatar: user.imageUrl,
        },
      });

      toast.success("Reply posted successfully!");
      setReplyContent("");
      loadDiscussion(); // Reload to show new reply
    } catch (error) {
      console.error("Failed to post reply:", error);
      toast.error("Failed to post reply. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (replyId: string) => {
    if (!user) {
      toast.error("Please sign in to like replies");
      return;
    }

    try {
      const newLikedPosts = new Set(likedPosts);
      if (newLikedPosts.has(replyId)) {
        // Unlike
        await communityApi.unlikeReply(replyId);
        newLikedPosts.delete(replyId);
      } else {
        // Like
        await communityApi.likeReply(replyId);
        newLikedPosts.add(replyId);
      }
      setLikedPosts(newLikedPosts);
      loadDiscussion(); // Reload to update likes count
    } catch (error) {
      console.error("Failed to update like:", error);
      toast.error("Failed to update like. Please try again.");
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast.error("Failed to copy link");
    }
  };

  const handleReport = async () => {
    if (!user) {
      toast.error("Please sign in to report discussions");
      return;
    }

    try {
      await communityApi.reportDiscussion(params?.id as string);
      toast.success("Discussion reported. Our team will review it.");
    } catch (error) {
      console.error("Failed to report discussion:", error);
      toast.error("Failed to report discussion");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

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

      {discussion && (
        <Card className="p-6 mb-8 bg-white/50 backdrop-blur-sm">
          <h1 className="text-2xl font-bold mb-4">{discussion.title}</h1>
          <div className="flex items-center mb-6">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={discussion.author.avatar} />
              <AvatarFallback>{discussion.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{discussion.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {discussion.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>
          <p className="text-gray-700 mb-6">{discussion.content}</p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <button className="hover:text-lime-600 transition-colors">
              <ThumbsUp className="h-4 w-4" />
            </button>
            <button className="hover:text-lime-600 transition-colors">
              <Share className="h-4 w-4" />
            </button>
            <button className="hover:text-red-500 transition-colors">
              <Flag className="h-4 w-4" />
            </button>
          </div>
        </Card>
      )}

      {/* Replies */}
      <div className="space-y-6 mb-8">
        {discussion?.replies.map((reply: Reply) => (
          <Card key={reply.id} className="p-6 bg-white/50 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={reply.author.avatar} />
                <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{reply.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {reply.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{reply.content}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <button
                onClick={() => handleLike(reply.id)}
                className={`flex items-center hover:text-lime-600 transition-colors
                  ${likedPosts.has(reply.id) ? "text-lime-600" : ""}`}
              >
                <ThumbsUp
                  className={`h-4 w-4 ${
                    likedPosts.has(reply.id) ? "fill-current" : ""
                  }`}
                />
                <span className="ml-1">{reply.likes || 0}</span>
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Discussion Actions */}
      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
        <button
          onClick={handleShare}
          className="hover:text-lime-600 transition-colors flex items-center"
        >
          <Share className="h-4 w-4 mr-1" />
          Share
        </button>
        <button
          onClick={handleReport}
          className="hover:text-red-500 transition-colors flex items-center"
        >
          <Flag className="h-4 w-4 mr-1" />
          Report
        </button>
      </div>

      {/* Reply Form */}
      <Card className="p-6 bg-white/50 backdrop-blur-sm">
        <h3 className="text-lg font-medium mb-4">Leave a Reply</h3>
        <form onSubmit={handleReply} className="space-y-4">
          <Textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply..."
            className="min-h-[100px] bg-white/50"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center px-4 py-2 rounded-full bg-lime-500 text-white hover:bg-lime-600 transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin mr-2">⌛</div>
                  Posting...
                </>
              ) : (
                <>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Post Reply
                </>
              )}
            </button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
