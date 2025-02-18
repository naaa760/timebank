"use client";

import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Send, Smile, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessage {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
}

export default function ChatPage() {
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Welcome to the TimeBank community chat!",
      sender: {
        id: "system",
        name: "System",
      },
      timestamp: new Date(),
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message.trim(),
      sender: {
        id: user.id,
        name: user.firstName ?? "Anonymous",
        avatar: user.imageUrl,
      },
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-10rem)]">
        {/* Chat Header */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Community Chat</h2>
          <p className="text-sm text-muted-foreground">
            {messages.length} messages
          </p>
        </div>

        {/* Messages Area */}
        <ScrollArea ref={scrollRef} className="h-[calc(100%-8rem)] p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${
                  msg.sender.id === user?.id
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <Avatar>
                  <AvatarImage src={msg.sender.avatar} />
                  <AvatarFallback>
                    {msg.sender.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`flex flex-col ${
                    msg.sender.id === user?.id ? "items-end" : ""
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">
                      {msg.sender.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div
                    className={`mt-1 rounded-lg p-3 ${
                      msg.sender.id === user?.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t flex items-center space-x-4"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0"
          >
            <Smile className="h-5 w-5" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" className="shrink-0">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
