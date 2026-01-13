import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface QuizListHeaderProps {
  onCreateClick: () => void;
}

export function QuizListHeader({ onCreateClick }: QuizListHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">All Quizzes</h2>
        <p className="text-sm text-slate-500 mt-1">
          Manage your quiz collection
        </p>
      </div>
      <Button onClick={onCreateClick} size="lg">
        <Plus className="h-4 w-4" strokeWidth={2.5} />
        <span className="hidden sm:inline">Create New Quiz</span>
      </Button>
    </div>
  );
}
