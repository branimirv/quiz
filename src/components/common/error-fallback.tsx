import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorFallbackProps {
  title?: string;
  message?: string;
}

export function ErrorFallback({
  title = "Something went wrong",
  message = "An unexpected error occurred.",
}: ErrorFallbackProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <div className="text-center max-w-md">
        <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
        <p className="text-slate-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => window.location.reload()}>Try Again</Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
