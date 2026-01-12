import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Button } from "../ui/button";

interface QuizSlideControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onHome: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
}

export function QuizSlideControls({
  onPrevious,
  onNext,
  onHome,
  isFirstQuestion,
  isLastQuestion,
}: QuizSlideControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Button
        onClick={onPrevious}
        disabled={isFirstQuestion}
        variant="outline"
        size="lg"
        className="min-w-[120px]"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Previous
      </Button>
      <Button onClick={onHome} variant="ghost" size="lg">
        <Home className="h-5 w-5 mr-2" />
        Back to List
      </Button>
      <Button
        onClick={onNext}
        disabled={isLastQuestion}
        variant="outline"
        size="lg"
        className="min-w-[120px]"
      >
        <ChevronRight className="h-5 w-5 mr-1" />
        Next
      </Button>
    </div>
  );
}
