import { useQuestions } from "@/lib/hooks/useQuestions";
import type { Question } from "@/lib/schemas/question.schema";
import { useMemo, useState, useCallback } from "react";
import { LoadingSpinner } from "../common/loading-spinner";
import { ErrorMessage } from "../common/error-message";
import { EmptyState } from "../common/empty-state";
import { Inbox, Search } from "lucide-react";
import { SectionHeader } from "../common/section-header";
import { Button } from "../ui/button";
import { Recycle } from "lucide-react";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { QuestionCard } from "./QuestionCard";
import { Checkbox } from "../ui/checkbox";
import { SearchInput } from "../common/search-input";
import { useSearch } from "@/lib/hooks/useSearch";

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

  const availableQuestions = useMemo(
    () =>
      questions?.filter((q) => q.id && !existingQuestionIds?.includes(q.id)) ||
      [],
    [questions, existingQuestionIds]
  );

  const {
    searchTerm,
    setSearchTerm,
    filteredItems: filteredQuestions,
    isSearching,
    hasResults,
    resultsCount,
  } = useSearch({
    items: availableQuestions,
    searchFields: ["question", "answer"],
  });

  const handleToggle = useCallback((questionId: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  }, []);

  const handleRecycle = useCallback(() => {
    if (!questions) return;
    const selected = questions.filter((q) => q.id && selectedIds.has(q.id));
    onRecycle(selected);
    setSelectedIds(new Set());
  }, [questions, selectedIds, onRecycle]);

  const handleSelectAll = useCallback(() => {
    const ids = filteredQuestions
      ?.map((q) => q.id)
      .filter((id): id is number => id !== undefined);
    setSelectedIds(new Set(ids));
  }, [filteredQuestions]);

  const handleClearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  if (isLoading)
    return <LoadingSpinner message="Loading questions..." size="md" />;

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load questions"
        message={error.message}
        onRetry={refetch}
      />
    );
  }

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
            : searchTerm
            ? `${resultsCount} of ${availableQuestions.length} questions`
            : "Select questions to add"
        }
        action={
          <div className="flex items-center gap-2">
            {selectedCount > 0 ? (
              <>
                <Button
                  onClick={handleClearSelection}
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
                disabled={!hasResults}
              >
                Select All
              </Button>
            )}
          </div>
        }
      />

      {/* Search Input */}
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search questions or answers..."
        isSearching={isSearching}
      />

      <Separator />

      {/* Empty search results */}
      {searchTerm && !hasResults ? (
        <EmptyState
          icon={<Search className="h-12 w-12 text-slate-300" />}
          title="No questions found"
          description={`No questions match "${searchTerm}"`}
          className="py-8"
        />
      ) : (
        <ScrollArea className="h-[300px]">
          <div className="space-y-4 pr-4">
            {filteredQuestions.map((question) => {
              const isSelected = question.id
                ? selectedIds.has(question.id)
                : false;
              return (
                <QuestionCard
                  key={question.id}
                  question={question}
                  showAnswer={true}
                  className={isSelected ? "border-blue-500 bg-blue-50/50" : ""}
                  actions={
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() =>
                        question.id && handleToggle(question.id)
                      }
                    />
                  }
                />
              );
            })}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
