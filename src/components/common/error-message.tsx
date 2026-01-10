import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message: string;
  className?: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  title = "Error",
  message,
  className,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "bg-red-50 border border-red-200 rounded-lg p-6 text-center",
        className
      )}
    >
      <div className="flex items-center justify-center mb-2">
        <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
        <p className="font-semibold text-red-800">{title}</p>
      </div>
      <p className="text-sm text-red-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 text-sm text-red-700 hover:text-red-800 underline"
        >
          Try again
        </button>
      )}
    </div>
  );
}
