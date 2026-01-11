import { useDeleteQuiz } from "@/lib/hooks/useQuizzes";
import { useState } from "react";

export function useQuizListActions() {
  const deleteQuizMutation = useDeleteQuiz();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<number | null>(null);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [quizToEdit, setQuizToEdit] = useState<number | null>(null);

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
    setQuizToEdit(quizId);
    setEditDialogOpen(true);
  };

  const handleCreateQuiz = () => {
    setCreateDialogOpen(true);
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
    createDialogOpen,
    setCreateDialogOpen,
    editDialogOpen,
    setEditDialogOpen,
    quizToEdit,
  };
}
