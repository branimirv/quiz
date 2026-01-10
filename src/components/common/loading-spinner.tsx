import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
  size: "md" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({
  message,
  size,
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className={cn("flex items-center justify-center py-12", className)}>
      <Loader2
        className={cn("animate-spin text-slate-400", sizeClasses[size])}
      />
      {message && <span className="ml-2 text-slate-600">{message}</span>}
    </div>
  );
}
