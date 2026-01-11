import { useQuestions } from "@/lib/hooks/useQuestions";
import type { Question } from "@/lib/schemas/question.schema";
import { useState } from "react";
import { LoadingSpinner } from "../common/loading-spinner";
import { ErrorMessage } from "../common/error-message";
import { EmptyState } from "../common/empty-state";
import { Inbox } from "lucide-react";
import { SectionHeader } from "../common/section-header";
import { Button } from "../ui/button";
import { Recycle } from "lucide-react";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { QuestionCard } from "./QuestionCard";
import { Checkbox } from "../ui/checkbox";

interface QuestionRecyclerProps {
  onRecycle: (questions: Question[]) => void;
  existingQuestionIds?: number[];
}

export function QuestionRecycler({
  onRecycle,
  existingQuestionIds,
}: QuestionRecyclerProps) {
  const { data: questions, isLoading, error, refetch } = useQuestions();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const handleToggle = (questionId: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  const handleRecycle = () => {
    if (!questions) return;
    const selected = questions.filter((q) => q.id && selectedIds.has(q.id));
    onRecycle(selected);
    setSelectedIds(new Set());
  };

  const handleSelectAll = () => {
    const ids = availableQuestions
      ?.map((q) => q.id)
      .filter((id): id is number => id !== undefined);
    setSelectedIds(new Set(ids));
  };

  if (isLoading)
    return <LoadingSpinner message="Loading questions..." size="md" />;

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load questions"
        message={error.message}
        onRetry={() => refetch()}
      />
    );
  }

  const availableQuestions =
    questions?.filter((q) => q.id && !existingQuestionIds?.includes(q.id)) ||
    [];

  if (availableQuestions?.length === 0) {
    return (
      <EmptyState
        icon={<Inbox className="h-12 w-12 text-slate-300" />}
        title="No questions available"
        description="Questions are created when you add them to quizzes"
        className="py-8"
      />
    );
  }

  const selectedCount = selectedIds.size;

  return (
    <div className="space-y-4">
      <SectionHeader
        title={`Question Bank (${availableQuestions?.length})`}
        description={
          selectedCount > 0
            ? `${selectedCount} selected`
            : "Select questions to add"
        }
        action={
          <div className="flex items-center gap-2">
            {selectedCount > 0 ? (
              <>
                <Button
                  onClick={() => setSelectedIds(new Set())}
                  size="sm"
                  variant="ghost"
                  type="button"
                >
                  Clear
                </Button>
                <Button onClick={handleRecycle} size="sm" type="button">
                  <Recycle className="h-4 w-4 mr-1" />
                  Add {selectedCount}
                </Button>
              </>
            ) : (
              <Button
                onClick={handleSelectAll}
                size="sm"
                variant="outline"
                type="button"
              >
                Select All
              </Button>
            )}
          </div>
        }
      />
      <Separator />

      <ScrollArea className="h-[300px]">
        <div className="space-y-4 pr-4">
          {availableQuestions?.map((question) => (
            <div
              key={question.id}
              onClick={() => question.id && handleToggle(question.id)}
              className="cursor-pointer hover:bg-slate-50 rounded-lg transition-colors"
            >
              <QuestionCard
                question={question}
                showAnswer={true}
                className={
                  question.id && selectedIds.has(question.id)
                    ? "border-blue-500 bg-blue-50/50"
                    : ""
                }
                actions={
                  <Checkbox
                    checked={question.id ? selectedIds.has(question.id) : false}
                    onCheckedChange={() =>
                      question.id && handleToggle(question.id)
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                }
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
