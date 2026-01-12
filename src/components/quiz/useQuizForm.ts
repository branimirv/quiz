import { useCreateQuiz, useUpdateQuiz } from "@/lib/hooks/useQuizzes";
import { CreateQuizSchema, type CreateQuiz } from "@/lib/schemas/quiz.schema";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Question } from "@/lib/schemas/question.schema";
import { useEffect, useMemo, useCallback } from "react";

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

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const addQuestion = useCallback(() => {
    const current = form.getValues("questions");
    form.setValue("questions", [...current, { question: "", answer: "" }], {
      shouldValidate: false,
    });
  }, [form]);

  const removeQuestion = useCallback(
    (index: number) => {
      const current = form.getValues("questions");
      form.setValue(
        "questions",
        current.filter((_, i) => i !== index),
        {
          shouldValidate: true,
        }
      );
    },
    [form]
  );

  const recycleQuestions = useCallback(
    (questions: Question[]) => {
      const current = form.getValues("questions");
      form.setValue("questions", [...current, ...questions], {
        shouldValidate: true,
      });
    },
    [form]
  );

  const questions = useWatch({
    control: form.control,
    name: "questions",
  });

  const existingQuestionIds = useMemo(
    () =>
      (questions || [])
        .map((q) => q.id)
        .filter((id): id is number => id !== undefined),
    [questions]
  );

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
