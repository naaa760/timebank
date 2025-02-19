"use client";

import { useState, useEffect } from "react";
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

export default function DiscussionPage() {
  const params = useParams();
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadDiscussion = async () => {
    const id = params?.id;
    if (!id) return;

    setIsLoading(true);
    try {
      const data = await communityApi.getDiscussion(id as string);
      const discussionData: Discussion = {
        ...data,
        createdAt: new Date(data.lastActivity),
        replies: data.replies || [],
      };
      setDiscussion(discussionData);
    } catch (error) {
      console.error("Failed to load discussion:", error);
      toast.error("Failed to load discussion");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDiscussion();
  }, [params?.id]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    try {
      await communityApi.createReply({
        discussionId: params?.id as string,
        content: replyContent,
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
              <button className="hover:text-lime-600 transition-colors">
                <ThumbsUp className="h-4 w-4" />
                <span className="ml-1">{reply.likes}</span>
              </button>
            </div>
          </Card>
        ))}
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
