import type { CreateQuiz } from "@/lib/schemas/quiz.schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { QuizForm } from "./QuizForm";

interface QuizFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  quizId?: number;
  defaultValues?: CreateQuiz;
}

export function QuizFormDialog({
  open,
  onOpenChange,
  mode,
  quizId,
  defaultValues,
}: QuizFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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
        <QuizForm
          mode={mode}
          quizId={quizId}
          defaultValues={defaultValues}
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
