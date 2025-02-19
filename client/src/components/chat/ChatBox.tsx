"use client";

import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { Send, Paperclip } from "lucide-react";
import { Message } from "./Message";
import { EmojiPicker } from "./EmojiPicker";
import { MessageSearch } from "./MessageSearch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/types/chat";
import { chatWebSocket } from "@/lib/services/ChatWebSocket";

export function ChatBox() {
  const { user } = useUser();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatWebSocket.connect();

    chatWebSocket.onMessage((data) => {
      console.log("Received WebSocket data:", data);

      if (data && data.type === "message" && data.message) {
        try {
          const newMessage: ChatMessage = {
            id: data.message.id,
            content: data.message.content,
            sender: data.message.sender,
            timestamp: new Date(data.message.timestamp),
            status: data.message.status || "sent",
            edited: data.message.edited || false,
          };

          setMessages((prev) => [...prev, newMessage]);
        } catch (error) {
          console.error("Error processing message:", error);
        }
      }
    });

    return () => chatWebSocket.disconnect();
  }, [user?.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: {
        id: user.id,
        name: user.fullName || "Anonymous",
        avatar: user.imageUrl,
      },
      timestamp: new Date(),
      status: "sent",
      edited: false,
    };

    try {
      // Add message to local state first
      setMessages((prev) => [...prev, message]);

      // Then send via WebSocket
      chatWebSocket.sendMessage({
        type: "message",
        message,
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleReaction = (messageId: string, emoji: string) => {
    chatWebSocket.sendMessage({
      type: "reaction",
      messageId,
      emoji,
    });
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="p-4 border-b">
        <MessageSearch onSearch={() => {}} />
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              isOwn={message.sender.id === user?.id}
              onReact={handleReaction}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5 text-gray-500" />
          </Button>
          <EmojiPicker
            onEmojiSelect={(emoji) => setNewMessage((prev) => prev + emoji)}
          />
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
