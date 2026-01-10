import type { Question } from "@/lib/schemas/question.schema";
import type { Quiz } from "@/lib/schemas/quiz.schema";

/**
 * Storage structure in LocalStorage
 */
export interface StorageData {
  quizzes: Record<number, Quiz>;
  questions: Record<number, Question>;
  nextQuizId: number;
  nextQuestionId: number;
}

/**
 * API error response
 */
export interface ApiError {
  message: string;
  code?: number;
}
