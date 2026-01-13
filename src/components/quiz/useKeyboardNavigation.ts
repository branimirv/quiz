import { useEffect } from "react";

interface UseKeyboardNavigationOptions {
  onPrevious?: () => void;
  onNext?: () => void;
  onReveal?: () => void;
  onExit?: () => void;
  onReset?: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
  enabled?: boolean;
}

/**
 * Custom hook for keyboard navigation in quiz slideshow
 *
 * @param options - Navigation handlers and conditions
 *
 * Keyboard shortcuts:
 * - ArrowLeft: Previous question
 * - ArrowRight: Next question
 * - Space/Enter: Reveal/hide answer
 * - Escape: Exit slideshow
 * - Home: Reset to first question
 */
export function useKeyboardNavigation({
  onPrevious,
  onNext,
  onReveal,
  onExit,
  onReset,
  canGoPrevious = true,
  canGoNext = true,
  enabled = true,
}: UseKeyboardNavigationOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Prevent default behavior for keys we're handling
      if (
        ["ArrowLeft", "ArrowRight", " ", "Enter", "Escape", "Home"].includes(
          e.key
        )
      ) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowLeft":
          if (canGoPrevious && onPrevious) {
            onPrevious();
          }
          break;
        case "ArrowRight":
          if (canGoNext && onNext) {
            onNext();
          }
          break;
        case " ": // Spacebar
        case "Enter":
          if (onReveal) {
            onReveal();
          }
          break;
        case "Escape":
          if (onExit) {
            onExit();
          }
          break;
        case "Home":
          if (onReset) {
            onReset();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    enabled,
    canGoPrevious,
    canGoNext,
    onPrevious,
    onNext,
    onReveal,
    onExit,
    onReset,
  ]);
}
