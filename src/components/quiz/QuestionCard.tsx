import type { Question } from "@/lib/schemas/question.schema";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface QuestionCardProps {
  question: Question;
  index?: number;
  showAnswer?: boolean;
  className?: string;
  actions?: React.ReactNode;
}

export function QuestionCard({
  question,
  index,
  showAnswer = true,
  className,
  actions,
}: QuestionCardProps) {
  return (
    <div
      className={cn(
        "border border-slate-200 rounded-lg p-4 bg-white",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {index !== undefined && (
              <span className="text-sm font-medium text-slate-700">
                Question {index + 1}
              </span>
            )}
            {question.id && (
              <Badge variant="secondary" className="text-xs">
                ID: {question.id}
              </Badge>
            )}
          </div>

          <p className="text-sm font-medium text-slate-900 mb-2">
            {question.question}
          </p>

          {showAnswer && (
            <p className="text-xs text-slate-600">
              <span className="font-medium">Answer:</span>
              {question.answer}
            </p>
          )}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
