import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { QuizSlideshow } from "@/components/quiz/QuizSlideshow";

export const Route = createFileRoute("/quiz/$quizId/take")({
  component: QuizTakePage,
});

function QuizTakePage() {
  const { quizId } = Route.useParams();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate({ to: "/" });
  };

  return <QuizSlideshow quizId={Number(quizId)} onClose={handleClose} />;
}
