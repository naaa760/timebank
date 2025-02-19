import { Smile } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Smile className="h-5 w-5 text-gray-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-none">
        <Picker
          data={data}
          onEmojiSelect={(emoji: { native: string }) =>
            onEmojiSelect(emoji.native)
          }
          theme="light"
          set="native"
        />
      </PopoverContent>
    </Popover>
  );
}
