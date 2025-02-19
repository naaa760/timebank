"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, Star, Settings, X } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface Message {
  id: string;
  name: string;
  message: string;
  time: string;
  isOnline: boolean;
  userId: string;
}

interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
}

const MessagePreview = ({
  name,
  message,
  time,
  isOnline,
  onClick,
}: {
  name: string;
  message: string;
  time: string;
  isOnline: boolean;
  onClick: () => void;
}) => (
  <motion.div
    onClick={onClick}
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    whileHover={{ scale: 1.02 }}
    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100"
  >
    <div className="relative">
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-100 to-teal-100 flex items-center justify-center">
        <span className="text-lg font-medium">{name[0]}</span>
      </div>
      {isOnline && (
        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-medium truncate">{name}</h3>
        <span className="text-sm text-gray-500 flex-shrink-0">{time}</span>
      </div>
      <p className="text-sm text-gray-600 truncate">{message}</p>
    </div>
  </motion.div>
);

const ChatWindow = ({
  selectedUser,
  onClose,
  messages,
  onSendMessage,
}: {
  selectedUser: Message;
  onClose: () => void;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 bg-white md:inset-auto md:absolute md:right-0 md:top-0 md:w-96 md:h-[600px] md:m-8 md:rounded-2xl md:shadow-2xl"
    >
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-100 to-teal-100 flex items-center justify-center">
              <span className="text-lg font-medium">
                {selectedUser.name[0]}
              </span>
            </div>
            <div>
              <h3 className="font-medium">{selectedUser.name}</h3>
              <span className="text-sm text-gray-500">
                {selectedUser.isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === "currentUser" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  msg.senderId === "currentUser"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button onClick={handleSend}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function MessagesPage() {
  useUser();
  const [messages] = useState<Message[]>([
    {
      id: "1",
      name: "Alice Chen",
      message: "The new design looks amazing! When can we...",
      time: "Just now",
      isOnline: true,
      userId: "alice",
    },
    {
      id: "2",
      name: "Tom Wilson",
      message: "Could you review the latest changes?",
      time: "2m ago",
      isOnline: true,
      userId: "tom",
    },
    {
      id: "3",
      name: "Sarah Parker",
      message: "Thanks for your help yesterday!",
      time: "1h ago",
      isOnline: false,
      userId: "sarah",
    },
    {
      id: "4",
      name: "David Kim",
      message: "Meeting scheduled for tomorrow at 10 AM",
      time: "3h ago",
      isOnline: true,
      userId: "david",
    },
    {
      id: "5",
      name: "Emma Davis",
      message: "Just sent you the updated files",
      time: "5h ago",
      isOnline: false,
      userId: "emma",
    },
  ]);

  const [selectedUser, setSelectedUser] = useState<Message | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      senderId: "currentUser",
      timestamp: new Date(),
    };
    setChatMessages([...chatMessages, newMessage]);

    // Simulate reply after 1 second
    setTimeout(() => {
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! I'll get back to you soon.",
        senderId: selectedUser?.userId || "",
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url("/mg.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Add a semi-transparent overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
            Messages
          </h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Star className="h-5 w-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </motion.div>

        {/* Messages List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-white/20"
        >
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="pl-10 bg-gray-50 border-none focus-visible:ring-1 focus-visible:ring-gray-200"
            />
          </div>

          <div className="space-y-3">
            {filteredMessages.map((msg) => (
              <MessagePreview
                key={msg.id}
                {...msg}
                onClick={() => setSelectedUser(msg)}
              />
            ))}
          </div>
        </motion.div>

        {/* New Message Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="fixed bottom-8 right-8"
        >
          <Button
            onClick={() => setSelectedUser(messages[0])}
            className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-rose-100 to-teal-100 hover:from-rose-200 hover:to-teal-200 transition-all duration-300"
          >
            <Send className="h-6 w-6 text-gray-700" />
          </Button>
        </motion.div>

        {/* Chat Window */}
        <AnimatePresence>
          {selectedUser && (
            <ChatWindow
              selectedUser={selectedUser}
              onClose={() => setSelectedUser(null)}
              messages={chatMessages}
              onSendMessage={handleSendMessage}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
