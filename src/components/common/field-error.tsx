import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface FieldErrorProps {
  message?: string;
  className?: string;
}

export function FieldError({ message, className }: FieldErrorProps) {
  if (!message) return null;

  return (
    <p
      className={cn("text-sm text-red-600 flex items-center gap-1", className)}
    >
      <AlertCircle className="h-3.5 w-3.5" />
      <span>{message}</span>
    </p>
  );
}
