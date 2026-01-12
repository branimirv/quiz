import type { Quiz } from "@/lib/schemas/quiz.schema";
import { TableCell, TableRow } from "@/components/ui/table";
import QuizActions from "./QuizActions";

interface QuizTableRowProps {
  quiz: Quiz;
  onEdit: (quizId: number) => void;
  onDelete: (quizId: number, e: React.MouseEvent) => void;
}

export function QuizTableRow({ quiz, onEdit, onDelete }: QuizTableRowProps) {
  const questionCount = quiz.questions.length;
  const questionText = questionCount === 1 ? "question" : "questions";

  return (
    <TableRow
      className="cursor-pointer hover:bg-slate-50"
      onClick={() => onEdit(quiz.id)}
    >
      <TableCell className="font-medium">{quiz.name}</TableCell>
      <TableCell className="text-center text-slate-600">
        {questionCount} {questionText}
      </TableCell>
      <TableCell className="text-right">
        <QuizActions quizId={quiz.id} onDelete={(e) => onDelete(quiz.id, e)} />
      </TableCell>
    </TableRow>
  );
}
