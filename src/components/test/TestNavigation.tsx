import { Button } from "@/components/ui";
import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../../lib/utils";

interface ITestNavigationProps extends HTMLAttributes<HTMLDivElement> {
  currentIndex: number;
  totalQuestions: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  isLastQuestion: boolean;
  isLoading?: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const TestNavigation = forwardRef<HTMLDivElement, ITestNavigationProps>(
  (
    {
      currentIndex,
      totalQuestions,
      canGoPrev,
      canGoNext,
      isLastQuestion,
      isLoading = false,
      onPrevious,
      onNext,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex justify-between items-center w-full mx-auto",
          className
        )}
        {...props}
      >
        <Button
          variant='secondary'
          onClick={onPrevious}
          disabled={!canGoPrev}
          className='min-w-[100px] disabled:opacity-50 disabled:cursor-not-allowed'
        >
          ← 이전
        </Button>
        <div className='text-base font-medium text-gray-500'>
          {currentIndex + 1} / {totalQuestions}
        </div>
        <Button
          variant={isLastQuestion ? "gradient" : "primary"}
          onClick={onNext}
          disabled={!canGoNext || isLoading}
          className='min-w-[100px] disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading
            ? "완료 중..."
            : isLastQuestion
              ? "결과 보기 🎉"
              : "다음 →"}
        </Button>
      </div>
    );
  }
);

TestNavigation.displayName = "TestNavigation";

export default TestNavigation;
