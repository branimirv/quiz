import { z } from "zod";

/**
 * Question schema based on API specifications
 */
export const QuestionSchema = z.object({
  id: z.number().optional(),
  question: z.string().min(1, "Question text is required"),
  answer: z.string().min(1, "Answer text is required"),
});

export type Question = z.infer<typeof QuestionSchema>;

/**
 * Schema for creating a new question
 */
export const CreateQuestionSchema = QuestionSchema.omit({ id: true });

export type CreateQuestion = z.infer<typeof CreateQuestionSchema>;
