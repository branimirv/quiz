import type { Question } from "@/lib/schemas/question.schema";
import { useCallback, useMemo, useState } from "react";

interface UseQuizSlideShowOptions {
  questions: Question[];
}

export function useQuizSlideshow({ questions }: UseQuizSlideShowOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(
    new Set()
  );

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const isAnswerRevealed = revealedAnswers.has(currentIndex);
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const progress = useMemo(
    () => ({
      current: currentIndex + 1,
      total: totalQuestions,
      percentage: ((currentIndex + 1) / totalQuestions) * 100,
    }),
    [currentIndex, totalQuestions]
  );

  const goToNext = useCallback(() => {
    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [isLastQuestion]);

  const goToPrevious = useCallback(() => {
    if (!isFirstQuestion) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [isFirstQuestion]);

  const toggleReveal = useCallback(() => {
    setRevealedAnswers((prev) => {
      const next = new Set(prev);
      if (next.has(currentIndex)) {
        next.delete(currentIndex);
      } else {
        next.add(currentIndex);
      }
      return next;
    });
  }, [currentIndex]);

  const goToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalQuestions) {
        setCurrentIndex(index);
      }
    },
    [totalQuestions]
  );

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setRevealedAnswers(new Set());
  }, []);

  return {
    currentQuestion,
    currentIndex,
    isAnswerRevealed,
    isFirstQuestion,
    isLastQuestion,
    progress,
    goToNext,
    goToPrevious,
    toggleReveal,
    goToQuestion,
    reset,
  };
}
