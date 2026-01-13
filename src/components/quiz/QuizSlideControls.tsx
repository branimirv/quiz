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
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Previous and Next buttons - side by side on mobile and desktop */}
      <div className="flex items-center justify-between md:justify-start gap-4 order-1 md:order-0">
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

        <Button
          onClick={onNext}
          disabled={isLastQuestion}
          variant="outline"
          size="lg"
          className="min-w-[120px] md:order-last"
        >
          Next
          <ChevronRight className="h-5 w-5 ml-1" />
        </Button>
      </div>

      {/* Back to List button - centered on mobile, in between on desktop */}
      <Button
        onClick={onHome}
        variant="ghost"
        size="lg"
        className="order-2 md:order-0 mx-auto md:mx-0"
      >
        <Home className="h-5 w-5 md:mr-2" />
        Back to List
      </Button>
    </div>
  );
}
