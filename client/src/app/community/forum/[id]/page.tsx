"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { ThumbsUp, Share, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  likes: number;
  replies: Reply[];
}

interface Reply {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  likes: number;
}

export default function ForumPostPage() {
  const params = useParams();
  const { user: currentUser } = useUser();
  const [replyContent, setReplyContent] = useState("");
  const [post, setPost] = useState<ForumPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // TODO: Replace with actual API call
        const mockPost: ForumPost = {
          id: "1",
          title: "Tips for new time bankers",
          content:
            "Here are some helpful tips for getting started with time banking...",
          author: {
            id: "user1",
            name: "Sarah Wilson",
            avatar: "/avatars/sarah.jpg",
          },
          createdAt: new Date("2024-03-20"),
          likes: 15,
          replies: [
            {
              id: "reply1",
              content: "Great tips! I'd also add...",
              author: {
                id: "user2",
                name: "John Doe",
              },
              createdAt: new Date("2024-03-21"),
              likes: 3,
            },
          ],
        };

        console.log("Fetching post:", params.id);
        setPost(mockPost);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [params.id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  // Use currentUser in reply submission
  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !replyContent.trim()) return;

    // TODO: Implement reply submission
    console.log("Submitting reply as:", currentUser.id);
    setReplyContent("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Main Post */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>
                  {post.author.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{post.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Posted by {post.author.name} on{" "}
                  {post.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Flag className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base mb-6">{post.content}</p>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="space-x-2">
              <ThumbsUp className="h-4 w-4" />
              <span>{post.likes}</span>
            </Button>
            <Button variant="ghost" className="space-x-2">
              <Share className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Replies */}
      <div className="mt-8 space-y-6">
        <h3 className="text-lg font-semibold">
          Replies ({post.replies.length})
        </h3>

        {/* Reply Form */}
        <form onSubmit={handleSubmitReply} className="space-y-4">
          <Textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply..."
            className="min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button type="submit">Post Reply</Button>
          </div>
        </form>

        {/* Reply List */}
        <div className="space-y-4">
          {post.replies.map((reply) => (
            <Card key={reply.id}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={reply.author.avatar} />
                    <AvatarFallback>
                      {reply.author.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{reply.author.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {reply.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <p className="mt-2">{reply.content}</p>
                    <div className="mt-4">
                      <Button variant="ghost" size="sm" className="space-x-2">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{reply.likes}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
