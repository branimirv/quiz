import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Play, Trash } from "lucide-react";

interface QuizActionsProps {
  quizId: number;
  onDelete: (e: React.MouseEvent) => void;
}

export default function QuizActions({ quizId, onDelete }: QuizActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        asChild
        size="sm"
        variant="outline"
        onClick={(e) => e.stopPropagation()}
      >
        <Link to="/quiz/$quizId/take" params={{ quizId: String(quizId) }}>
          <Play className="h-4 w-4 mr-1" />
          Take Quiz
        </Link>
      </Button>
      <Button size="sm" variant="destructive" onClick={onDelete}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}
