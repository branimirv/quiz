import { Button } from "@/components/ui/button";
import { Play, Trash } from "lucide-react";

interface QuizActionsProps {
  onTakeQuiz: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDeleting?: boolean;
}

export default function QuizActions({
  onTakeQuiz,
  onDelete,
  isDeleting = false,
}: QuizActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button size="sm" variant="outline" onClick={onTakeQuiz}>
        <Play className="h-4 w-4 mr-1" />
        Take Quiz
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={onDelete}
        disabled={isDeleting}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}
