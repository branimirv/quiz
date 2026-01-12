import { Progress } from "@/components/ui/progress";

interface QuizSlideProgressProps {
  current: number;
  total: number;
  percentage: number;
}

export function QuizSlideProgress({
  current,
  total,
  percentage,
}: QuizSlideProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">
          Question {current} of {total}
        </span>
        <span className="text-slate-500">{Math.round(percentage)}%</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
