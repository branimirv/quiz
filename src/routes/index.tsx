import { QuizList } from "@/components/quiz/QuizList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: QuizList,
});
