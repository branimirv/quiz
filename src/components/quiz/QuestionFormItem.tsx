import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { CreateQuiz } from "@/lib/schemas/quiz.schema";
import { Trash2 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

interface QuestionFormItemProps {
  form: UseFormReturn<CreateQuiz>;
  index: number;
  isRecycled: boolean;
  onRemove: () => void;
}

export function QuestionFormItem({
  form,
  index,
  isRecycled,
  onRemove,
}: QuestionFormItemProps) {
  return (
    <div className="border border-slate-200 rounded-lg p-4 space-y-3 bg-slate-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">
            Question {index + 1}
          </span>
          {isRecycled && (
            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
              Recycled
            </span>
          )}
        </div>
        <Button
          type="button"
          onClick={onRemove}
          size="sm"
          variant="ghost"
          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <FormField
        control={form.control}
        name={`questions.${index}.question`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Question Text</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Enter your question..."
                className="min-h-[80px] bg-white"
                disabled={isRecycled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`questions.${index}.answer`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Answer</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Enter your answer..."
                className="min-h-[60px] bg-white"
                disabled={isRecycled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {isRecycled && (
        <p className="text-xs text-slate-500 italic">
          This is a recycled question and cannot be edited
        </p>
      )}
    </div>
  );
}
