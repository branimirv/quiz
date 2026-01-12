import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { ErrorMessage } from "@/components/common/error-message";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { useQuiz, useQuizzes } from "@/lib/hooks/useQuizzes";
import { QuizEmptyState } from "./QuizEmptyState";
import { QuizFormDialog } from "./QuizFormDialog";
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
    createDialogOpen,
    setCreateDialogOpen,
    editDialogOpen,
    setEditDialogOpen,
    quizToEdit,
  } = useQuizListActions();

  const { data: quizToEditData, isLoading: isLoadingQuizData } = useQuiz(
    quizToEdit || 0
  );

  if (isLoading)
    return <LoadingSpinner message="Loading quizzes..." size="md" />;

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load quizzes"
        message={error.message}
        onRetry={refetch}
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

      <QuizFormDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        mode="create"
      />

      {quizToEdit && (
        <QuizFormDialog
          key={quizToEdit}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          mode="edit"
          quizId={quizToEdit}
          defaultValues={quizToEditData}
          isLoading={isLoadingQuizData}
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
