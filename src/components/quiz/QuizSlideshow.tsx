import { useQuiz } from "@/lib/hooks/useQuizzes";
import { useQuizSlideshow } from "./useQuizSlideshow";
import { useEffect, useCallback } from "react";
import { LoadingSpinner } from "../common/loading-spinner";
import { EmptyState } from "../common/empty-state";
import { AlertCircle } from "lucide-react";
import { QuizSlideProgress } from "./QuizSlideProgress";
import { QuizSlideQuestion } from "./QuizSlideQuestion";
import { QuizSlideControls } from "./QuizSlideControls";
import { ErrorMessage } from "../common/error-message";
import { KeyboardShortcutsHint } from "./KeyboardShortcutsHint";
import { useKeyboardNavigation } from "./useKeyboardNavigation";

interface QuizSlideshowProps {
  quizId: number;
  onClose?: () => void;
}

export function QuizSlideshow({ quizId, onClose }: QuizSlideshowProps) {
  const { data: quiz, isLoading, error, refetch } = useQuiz(quizId);

  const {
    currentQuestion,
    isAnswerRevealed,
    isFirstQuestion,
    isLastQuestion,
    progress,
    goToNext,
    goToPrevious,
    toggleReveal,
    reset,
  } = useQuizSlideshow({ questions: quiz?.questions || [] });

  const handleHome = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    reset();
  }, [quizId, reset]);

  useKeyboardNavigation({
    onPrevious: goToPrevious,
    onNext: goToNext,
    onReveal: toggleReveal,
    onExit: handleHome,
    onReset: reset,
    canGoPrevious: !isFirstQuestion,
    canGoNext: !isLastQuestion,
    enabled: !isLoading && !error && !!quiz,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner message="Loading quiz..." size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <ErrorMessage
          title="Failed to load quiz"
          message={error.message}
          onRetry={refetch}
        />
      </div>
    );
  }

  if (!quiz || quiz.questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <EmptyState
          icon={<AlertCircle className="h-16 w-16 text-slate-300" />}
          title="No questions available"
          description="This quiz doesn't have any questions yet"
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <KeyboardShortcutsHint />

      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          {quiz.name}
        </h1>
        <QuizSlideProgress {...progress} />
      </div>

      <QuizSlideQuestion
        question={currentQuestion}
        isRevealed={isAnswerRevealed}
        onToggleReveal={toggleReveal}
        questionNumber={progress.current}
      />

      <QuizSlideControls
        onPrevious={goToPrevious}
        onNext={goToNext}
        onHome={handleHome}
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
      />
    </div>
  );
}
