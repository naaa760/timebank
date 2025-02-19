import { Check, CheckCheck } from "lucide-react";

interface MessageStatusProps {
  status: "sent" | "delivered" | "read";
}

export function MessageStatus({ status }: MessageStatusProps) {
  return (
    <span className="ml-2">
      {status === "sent" && <Check className="h-3 w-3 text-gray-400" />}
      {status === "delivered" && (
        <CheckCheck className="h-3 w-3 text-gray-400" />
      )}
      {status === "read" && <CheckCheck className="h-3 w-3 text-lime-500" />}
    </span>
  );
}
