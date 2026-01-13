import type { CreateQuiz } from "@/lib/schemas/quiz.schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { QuizForm } from "./QuizForm";
import { LoadingSpinner } from "../common/loading-spinner";

interface QuizFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  quizId?: number;
  defaultValues?: CreateQuiz;
  isLoading?: boolean;
}

export function QuizFormDialog({
  open,
  onOpenChange,
  mode,
  quizId,
  defaultValues,
  isLoading = false,
}: QuizFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New Quiz" : "Edit Quiz"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Fill in the quiz details and add questions"
              : "Update quiz information and questions"}
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="py-8">
            <LoadingSpinner message="Loading quiz data..." size="md" />
          </div>
        ) : (
          <QuizForm
            mode={mode}
            quizId={quizId}
            defaultValues={defaultValues}
            onSuccess={() => onOpenChange(false)}
            onCancel={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
