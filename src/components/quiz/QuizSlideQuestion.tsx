import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Question } from "@/lib/schemas/question.schema";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizSlideQuestionProps {
  question: Question;
  isRevealed: boolean;
  onToggleReveal: () => void;
  questionNumber: number;
}

export function QuizSlideQuestion({
  question,
  isRevealed,
  onToggleReveal,
  questionNumber,
}: QuizSlideQuestionProps) {
  return (
    <div className="space-y-6">
      <Card className="p-8 md:p-12">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
            Question {questionNumber}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-8">
          {question.question}
        </h2>

        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            isRevealed ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
          )}
        >
          {isRevealed && (
            <div className="pt-6 border-t border-slate-200">
              <p className="text-sm font-medium text-emerald-600 mb-2">
                Answer:
              </p>
              <p className="text-lg md:text-xl text-slate-900">
                {question.answer}
              </p>
            </div>
          )}
        </div>
      </Card>
      <div className="flex justify-center">
        <Button
          onClick={onToggleReveal}
          size="lg"
          variant={isRevealed ? "outline" : "default"}
          className="min-w-[200px]"
        >
          {isRevealed ? (
            <>
              <EyeOff className="h-5 w-5 mr-2" />
              Hide Answer
            </>
          ) : (
            <>
              <Eye className="h-5 w-5 mr-2" />
              Reveal Answer
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
