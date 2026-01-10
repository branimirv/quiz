import { z } from "zod";
import { QuestionSchema } from "./question.schema";

/**
 * Quiz schema based on API specifications
 */
export const QuizSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Quiz name is required"),
  questions: z
    .array(QuestionSchema)
    .min(1, "At least one question is required"),
});

export type Quiz = z.infer<typeof QuizSchema>;

/**
 * Schema for creating a new quiz
 */
export const CreateQuizSchema = QuizSchema.omit({ id: true });
export type CreateQuiz = z.infer<typeof CreateQuizSchema>;

/**
 * Schema for updating a quiz
 */
export const UpdateQuizSchema = QuizSchema.omit({ id: true });

export type UpdateQuiz = z.infer<typeof UpdateQuizSchema>;
