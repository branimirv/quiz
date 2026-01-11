import { useCreateQuiz, useUpdateQuiz } from "@/lib/hooks/useQuizzes";
import { CreateQuizSchema, type CreateQuiz } from "@/lib/schemas/quiz.schema";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Question } from "@/lib/schemas/question.schema";

interface UseQuizFormOptions {
  mode: "create" | "edit";
  defaultValues?: CreateQuiz;
  quizId?: number;
  onSuccess?: () => void;
}

export function useQuizForm({
  mode,
  defaultValues,
  quizId,
  onSuccess,
}: UseQuizFormOptions) {
  const createMutation = useCreateQuiz();
  const updateMutation = useUpdateQuiz();

  const form = useForm<CreateQuiz>({
    resolver: zodResolver(CreateQuizSchema),
    defaultValues: defaultValues || {
      name: "",
      questions: [],
    },
  });

  const addQuestion = () => {
    const current = form.getValues("questions");
    form.setValue("questions", [...current, { question: "", answer: "" }], {
      shouldValidate: false,
    });
  };

  const removeQuestion = (index: number) => {
    const current = form.getValues("questions");
    form.setValue(
      "questions",
      current.filter((_, i) => i !== index),
      {
        shouldValidate: true,
      }
    );
  };

  const recycleQuestions = (questions: Question[]) => {
    const current = form.getValues("questions");
    form.setValue("questions", [...current, ...questions], {
      shouldValidate: true,
    });
  };

  const questions = useWatch({
    control: form.control,
    name: "questions",
  });

  const existingQuestionIds = (questions || [])
    .map((q) => q.id)
    .filter((id): id is number => id !== undefined);

  const handleSubmit = form.handleSubmit((data) => {
    if (mode === "create") {
      createMutation.mutate(data, {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
      });
    } else if (mode === "edit" && quizId) {
      updateMutation.mutate(
        { id: quizId, quiz: data },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        }
      );
    }
  });

  return {
    form,
    addQuestion,
    removeQuestion,
    recycleQuestions,
    existingQuestionIds,
    handleSubmit,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
    isSuccess: createMutation.isSuccess || updateMutation.isSuccess,
    error: createMutation.error || updateMutation.error,
  };
}
