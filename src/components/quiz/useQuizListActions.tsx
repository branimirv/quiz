import { useDeleteQuiz } from "@/lib/hooks/useQuizzes";
import { useState } from "react";

export function useQuizListActions() {
  const deleteQuizMutation = useDeleteQuiz();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<number | null>(null);

  const handleDeleteClick = (quizId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuizToDelete(quizId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (quizToDelete !== null) {
      deleteQuizMutation.mutate(quizToDelete);
      setDeleteDialogOpen(false);
      setQuizToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setQuizToDelete(null);
  };

  const handleTakeQuiz = (quizId: number, e: React.MouseEvent) => {
    e.stopPropagation();

    // todo: Navigate to take quiz page
    console.log("Take quiz:", quizId);
  };

  const handleEditQuiz = (quizId: number) => {
    // todo: navigate to edit page
    console.log("Edit quiz", quizId);
  };

  const handleCreateQuiz = () => {
    console.log("Create new quiz");
  };

  return {
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    handleTakeQuiz,
    handleEditQuiz,
    handleCreateQuiz,
  };
}
