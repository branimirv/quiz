import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { ErrorMessage } from "@/components/common/error-message";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { useQuizzes } from "@/lib/hooks/useQuizzes";
import { QuizEmptyState } from "./QuizEmptyState";
import { QuizListHeader } from "./QuizListHeader";
import { QuizTable } from "./QuizTable";
import { useQuizListActions } from "./useQuizListActions";

export function QuizList() {
  const { data: quizzes, isLoading, error, refetch } = useQuizzes();
  const {
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleDeleteClick,
    handleConfirmDelete,
    handleTakeQuiz,
    handleEditQuiz,
    handleCreateQuiz,
  } = useQuizListActions();

  if (isLoading)
    return <LoadingSpinner message="Loading quizzes..." size="md" />;

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load quizzes"
        message={error.message}
        onRetry={() => refetch()}
      />
    );
  }

  const hasQuizzes = quizzes && quizzes.length > 0;

  return (
    <>
      <QuizListHeader onCreateClick={handleCreateQuiz} />
      {!hasQuizzes ? (
        <QuizEmptyState onCreateClick={handleCreateQuiz} />
      ) : (
        <QuizTable
          quizzes={quizzes}
          onEditQuiz={handleEditQuiz}
          onTakeQuiz={handleTakeQuiz}
          onDeleteQuiz={handleDeleteClick}
        />
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Are you sure?"
        description="This will permanently delete this quiz. The questions will remain available for recycling in other quizzes."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
}
