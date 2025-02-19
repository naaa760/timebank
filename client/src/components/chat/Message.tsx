import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, Pencil, Trash2, X, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageStatus } from "./MessageStatus";
import { MessageReactions } from "./MessageReactions";
import { ChatMessage } from "@/types/chat";

interface MessageProps {
  message: ChatMessage;
  isOwn: boolean;
  onReact: (messageId: string, emoji: string) => void;
  onEdit: (messageId: string, newContent: string) => void;
  onDelete: (messageId: string) => void;
}

export function Message({
  message,
  isOwn,
  onReact,
  onEdit,
  onDelete,
}: MessageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);

  const handleEdit = () => {
    if (editedContent.trim() !== message.content) {
      onEdit(message.id, editedContent);
    }
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={`flex items-start space-x-3 ${
        isOwn ? "flex-row-reverse space-x-reverse" : ""
      }`}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={message.sender.avatar} />
        <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
      </Avatar>
      <div
        className={`group relative max-w-[70%] rounded-lg p-3 ${
          isOwn ? "bg-lime-500 text-white" : "bg-white"
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium">{message.sender.name}</p>
          {isOwn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-black/10 transition-all">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => onDelete(message.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[60px] bg-black/10 border-none text-sm mb-2"
                autoFocus
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1 rounded-full hover:bg-black/10"
                >
                  <X className="h-4 w-4" />
                </button>
                <button
                  onClick={handleEdit}
                  className="p-1 rounded-full hover:bg-black/10"
                >
                  <Check className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm"
            >
              {message.content}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-muted-foreground">
            {new Date(message.timestamp).toLocaleTimeString()}
            {message.edited && (
              <span className="ml-1 text-xs opacity-70">(edited)</span>
            )}
          </p>
          {isOwn && <MessageStatus status={message.status || "sent"} />}
        </div>

        <div
          className={`absolute ${
            isOwn ? "left-0" : "right-0"
          } -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity`}
        >
          <MessageReactions
            messageId={message.id}
            reactions={message.reactions || []}
            onReact={onReact}
          />
        </div>
      </div>
    </motion.div>
  );
}
