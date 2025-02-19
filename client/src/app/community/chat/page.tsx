"use client";

import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, Send, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ChatMessage, ChatUser } from "@/types/chat";
import { communityApi } from "@/lib/api/community";
import { Message } from "@/components/chat/Message";

export default function ChatPage() {
  const { user } = useUser();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<ChatUser[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const ws = useRef<WebSocket | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set([]));

  // Initialize WebSocket connection with reconnection logic
  useEffect(() => {
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
    const reconnectDelay = 3000;

    const connectWebSocket = () => {
      const socket = new WebSocket(
        process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001"
      );

      socket.onopen = () => {
        console.log("Connected to chat server");
        reconnectAttempts = 0;

        // Send user info when connected
        if (user) {
          socket.send(
            JSON.stringify({
              type: "join",
              user: {
                id: user.id,
                name: user.firstName,
                avatar: user.imageUrl,
              },
            })
          );
        }
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          switch (data.type) {
            case "message":
              // Ensure the message has the correct format
              const newMessage: ChatMessage = {
                ...data.message,
                timestamp: new Date(data.message.timestamp),
              };
              setMessages((prev) => [...prev, newMessage]);
              break;
            case "users":
              setOnlineUsers(data.users);
              break;
            case "typing":
              setTypingUsers((prev) => new Set(prev.add(data.userId)));
              break;
            case "stopTyping":
              setTypingUsers((prev) => {
                const newSet = new Set(prev);
                newSet.delete(data.userId);
                return newSet;
              });
              break;
            default:
              break;
          }
        } catch (error) {
          console.error("Error processing message:", error);
        }
      };

      socket.onclose = () => {
        if (reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          setTimeout(connectWebSocket, reconnectDelay);
        } else {
          toast.error("Connection lost. Please refresh the page.");
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        toast.error("Connection error. Trying to reconnect...");
      };

      ws.current = socket;
    };

    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [user]);

  // Load initial messages
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await communityApi.getChatMessages();
        setMessages(data);
      } catch (error) {
        console.error("Failed to load messages:", error);
        toast.error("Failed to load chat history");
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !ws.current) return;

    try {
      const messageData = {
        type: "message",
        content: newMessage,
        sender: {
          id: user?.id || "",
          name: user?.firstName || "Anonymous",
          avatar: user?.imageUrl,
        },
        timestamp: new Date(),
      };

      ws.current.send(JSON.stringify(messageData));
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  // Handle typing indicator
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    if (ws.current) {
      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Send typing indicator
      ws.current.send(JSON.stringify({ type: "typing", userId: user?.id }));

      // Set timeout to clear typing indicator
      typingTimeoutRef.current = setTimeout(() => {
        if (ws.current) {
          ws.current.send(
            JSON.stringify({ type: "stopTyping", userId: user?.id })
          );
        }
      }, 1000);
    }
  };

  const handleReaction = (messageId: string, emoji: string) => {
    if (ws.current) {
      ws.current.send(
        JSON.stringify({
          type: "reaction",
          messageId,
          emoji,
          userId: user?.id,
        })
      );
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-[600px] bg-gray-200 rounded"></div>
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
        Back to Community
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Online Users Sidebar */}
        <Card className="p-4 bg-white/50 backdrop-blur-sm h-[600px]">
          <div className="flex items-center mb-4">
            <Users className="h-5 w-5 text-lime-600 mr-2" />
            <h2 className="font-semibold">Online Users</h2>
          </div>
          <div className="space-y-2">
            <AnimatePresence>
              {onlineUsers.map((chatUser) => (
                <motion.div
                  key={chatUser.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center p-2 rounded-lg hover:bg-lime-50"
                >
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={chatUser.avatar} />
                    <AvatarFallback>{chatUser.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{chatUser.name}</p>
                    <p className="text-xs text-lime-600">Online</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-3 flex flex-col h-[600px] bg-white/50 backdrop-blur-sm">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <Message
                  key={message.id}
                  message={message}
                  isOwn={message.sender.id === user?.id}
                  onReact={handleReaction}
                  onEdit={(messageId, newContent) => {
                    if (ws.current) {
                      ws.current.send(
                        JSON.stringify({
                          type: "edit",
                          messageId,
                          content: newContent,
                        })
                      );
                    }
                  }}
                  onDelete={(messageId) => {
                    if (ws.current) {
                      ws.current.send(
                        JSON.stringify({ type: "delete", messageId })
                      );
                    }
                  }}
                />
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {typingUsers.size > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center space-x-2 text-sm text-gray-500"
              >
                <div className="flex space-x-1">
                  <span className="animate-bounce">•</span>
                  <span className="animate-bounce delay-100">•</span>
                  <span className="animate-bounce delay-200">•</span>
                </div>
                <span>
                  {Array.from(typingUsers)
                    .map(
                      (id) =>
                        onlineUsers.find((u) => u.id === id)?.name || "Someone"
                    )
                    .join(", ")}{" "}
                  is typing...
                </span>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <Input
                value={newMessage}
                onChange={handleTyping}
                placeholder="Type a message..."
                className="flex-1 bg-white/50"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className={`inline-flex items-center p-2 rounded-full ${
                  newMessage.trim()
                    ? "bg-lime-500 hover:bg-lime-600"
                    : "bg-gray-300 cursor-not-allowed"
                } text-white transition-colors`}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </Card>
      </div>
    </motion.div>
  );
}
