import type { CreateQuiz } from "@/lib/schemas/quiz.schema";
import type { UseFormReturn } from "react-hook-form";
import { SectionHeader } from "@/components/common/section-header";
import { Button } from "../ui/button";
import { EmptyState } from "../common/empty-state";
import { FileQuestion, Plus } from "lucide-react";
import { QuestionFormItem } from "./QuestionFormItem";
import { FieldError } from "../common/field-error";

interface QuestionFieldArrayProps {
  form: UseFormReturn<CreateQuiz>;
  onRemove: (index: number) => void;
  onAdd: () => void;
}

export function QuestionFieldArray({
  form,
  onRemove,
  onAdd,
}: QuestionFieldArrayProps) {
  const questions = form.watch("questions");
  const arrayError = form.formState.errors.questions;

  if (questions.length === 0) {
    return (
      <div className="space-y-4">
        <SectionHeader
          title="Questions"
          action={
            <Button type="button" onClick={onAdd} size="sm" variant="outline">
              Add Question
            </Button>
          }
        />
        <EmptyState
          icon={<FileQuestion className="h-12 w-12 text-slate-300" />}
          title="No questions yet"
          description="Add questions manually or recycle from existing quizzes"
          action={
            <Button type="button" onClick={onAdd} variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add Your First Question
            </Button>
          }
          className="py-12"
        />
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <SectionHeader
        title={`Questions (${questions.length})`}
        description="Add, edit, or remove questions for this quiz"
        action={
          <Button type="button" onClick={onAdd} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Question
          </Button>
        }
      />

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {questions.map((question, index) => (
          <QuestionFormItem
            key={index}
            form={form}
            index={index}
            isRecycled={!!question.id}
            onRemove={() => onRemove(index)}
          />
        ))}
      </div>

      {typeof arrayError?.message === "string" && (
        <FieldError message={arrayError.message} />
      )}
    </div>
  );
}
