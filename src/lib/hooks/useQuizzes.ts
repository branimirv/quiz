import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createQuiz,
  deleteQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
} from "@/lib/api/quizzes";
import type { CreateQuiz, UpdateQuiz } from "../schemas/quiz.schema";

/**
 * Query key factory for quizzes
 */
export const quizKeys = {
  all: ["quizzes"] as const,
  detail: (id: number) => ["quizzes", id] as const,
};

/**
 * Fetch all quizzes
 */
export const useQuizzes = () => {
  return useQuery({
    queryKey: quizKeys.all,
    queryFn: getAllQuizzes,
  });
};

/**
 * Fetch single quiz by id
 */
export const useQuiz = (id: number) => {
  return useQuery({
    queryKey: quizKeys.detail(id),
    queryFn: () => getQuizById(id),
    enabled: !!id,
  });
};

/**
 * Create a new quiz
 */
export const useCreateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quiz: CreateQuiz) => createQuiz(quiz),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quizKeys.all });
    },
  });
};

/**
 * Hook to update a quiz
 */
export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, quiz }: { id: number; quiz: UpdateQuiz }) =>
      updateQuiz(id, quiz),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: quizKeys.all });
      queryClient.invalidateQueries({ queryKey: quizKeys.detail(data.id) });
    },
  });
};

/**
 * Delete a quiz
 */
export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteQuiz(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quizKeys.all });
    },
  });
};
