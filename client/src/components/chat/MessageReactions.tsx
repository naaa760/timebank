import { motion } from "framer-motion";
import { Smile, Heart, ThumbsUp, Star, Flame } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const reactions = [
  { emoji: "👍", icon: ThumbsUp },
  { emoji: "❤️", icon: Heart },
  { emoji: "⭐", icon: Star },
  { emoji: "🔥", icon: Flame },
];

interface MessageReactionsProps {
  messageId: string;
  reactions: { emoji: string; users: string[] }[];
  onReact: (messageId: string, emoji: string) => void;
}

export function MessageReactions({
  messageId,
  reactions: currentReactions,
  onReact,
}: MessageReactionsProps) {
  return (
    <div className="flex items-center space-x-1">
      <Popover>
        <PopoverTrigger asChild>
          <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Smile className="h-4 w-4 text-gray-500" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <div className="flex space-x-2">
            {reactions.map(({ emoji }) => (
              <motion.button
                key={emoji}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => onReact(messageId, emoji)}
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {currentReactions.map(({ emoji, users }) => (
        <motion.div
          key={emoji}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-sm"
        >
          <span className="mr-1">{emoji}</span>
          <span className="text-xs text-gray-500">{users.length}</span>
        </motion.div>
      ))}
    </div>
  );
}
