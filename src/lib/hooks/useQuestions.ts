import { useQuery } from "@tanstack/react-query";
import { getAllQuestions } from "@/lib/api/questions";

/**
 * Query key for questions
 */
export const questionKeys = {
  all: ["questions"] as const,
};

/**
 * Hook to fetch all questions (for recycling)
 */
export const useQuestions = () => {
  return useQuery({
    queryKey: questionKeys.all,
    queryFn: getAllQuestions,
  });
};
