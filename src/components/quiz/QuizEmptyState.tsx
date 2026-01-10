import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { FileQuestion, Plus } from "lucide-react";

interface QuizEmptyStateProps {
  onCreateClick: () => void;
}

export function QuizEmptyState({ onCreateClick }: QuizEmptyStateProps) {
  return (
    <EmptyState
      icon={<FileQuestion className="h-16 w-16 text-slate-300" />}
      title="No quizzes yet"
      description="Get started by creating your first quiz"
      action={
        <Button onClick={onCreateClick} size="lg">
          <Plus className="h-4 w-4" />
          Create Your First Quiz
        </Button>
      }
    />
  );
}
