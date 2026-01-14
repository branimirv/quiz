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
      {/* Previous and Next buttons - side by side on mobile, spread out on desktop */}
      <div className="flex items-center justify-between md:contents gap-4">
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

        {/* Back to List button - centered on mobile, in middle on desktop */}
        <Button
          onClick={onHome}
          variant="ghost"
          size="lg"
          className="hidden md:flex"
        >
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
          Next
          <ChevronRight className="h-5 w-5 ml-1" />
        </Button>
      </div>

      {/* Back to List button - visible only on mobile */}
      <Button
        onClick={onHome}
        variant="ghost"
        size="lg"
        className="md:hidden mx-auto"
      >
        <Home className="h-5 w-5 mr-2" />
        Back to List
      </Button>
    </div>
  );
}
