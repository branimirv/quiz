import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Quiz } from "@/lib/schemas/quiz.schema";
import { QuizTableRow } from "./QuizTableRow";

interface QuizTableProps {
  quizzes: Quiz[];
  onEditQuiz: (quizId: number) => void;
  onTakeQuiz: (quizId: number, e: React.MouseEvent) => void;
  onDeleteQuiz: (quizId: number, e: React.MouseEvent) => void;
}

export function QuizTable({
  quizzes,
  onEditQuiz,
  onTakeQuiz,
  onDeleteQuiz,
}: QuizTableProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">Quiz Name</TableHead>
            <TableHead className="text-center w-[150px]">Questions</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quizzes.map((quiz) => (
            <QuizTableRow
              key={quiz.id}
              quiz={quiz}
              onEdit={onEditQuiz}
              onTakeQuiz={onTakeQuiz}
              onDelete={onDeleteQuiz}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
