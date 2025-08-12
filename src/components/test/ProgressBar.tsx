import { questions } from "@/data/questions";
import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../../lib/utils";

interface IProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  current: number;
  total?: number;
  showLabel?: boolean;
}

const ProgressBar = forwardRef<HTMLDivElement, IProgressBarProps>(
  (
    {
      current,
      total = questions.length,
      showLabel = true,
      className,
      ...props
    },
    ref
  ) => {
    const progress = Math.min((current / total) * 100, 100);

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {showLabel && (
          <div className='flex justify-between items-center mb-2'>
            <span className='text-sm font-medium text-gray-700'>진행률</span>
            <span className='text-sm font-semibold text-primary-500'>
              {current}/{total}
            </span>
          </div>
        )}
        <div className='w-full bg-gray-200 rounded-full h-2 overflow-hidden'>
          <div
            className='h-full bg-primary-500 rounded-full transition-all duration-300 ease-out'
            style={{ width: `${progress}%` }}
          />
        </div>
        {showLabel && (
          <div className='mt-1 text-xs text-gray-500 text-center'>
            {Math.round(progress)}% 완료
          </div>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
