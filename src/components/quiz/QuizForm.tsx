import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CreateQuiz } from "@/lib/schemas/quiz.schema";
import { Loader2 } from "lucide-react";
import { QuestionFieldArray } from "./QuestionFieldArray";
import { QuestionRecycler } from "./QuestionRecycler";
import { useQuizForm } from "./useQuizForm";

interface QuizFormProps {
  mode: "create" | "edit";
  quizId?: number;
  defaultValues?: CreateQuiz;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function QuizForm({
  mode,
  quizId,
  defaultValues,
  onSuccess,
  onCancel,
}: QuizFormProps) {
  const {
    form,
    addQuestion,
    removeQuestion,
    recycleQuestions,
    existingQuestionIds,
    handleSubmit,
    isSubmitting,
  } = useQuizForm({ mode, quizId, defaultValues, onSuccess });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quiz Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter quiz name..."
                  className="text-base"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Tabs defaultValue="questions" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="recycle">Recycle Questions</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-4 mt-4">
            <QuestionFieldArray
              form={form}
              onAdd={addQuestion}
              onRemove={removeQuestion}
            />
          </TabsContent>

          <TabsContent value="recycle" className="space-y-4 mt-4">
            <QuestionRecycler
              onRecycle={recycleQuestions}
              existingQuestionIds={existingQuestionIds}
            />
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {mode === "create" ? "Create Quiz" : "Update Quiz"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
