import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../../lib/utils";

interface IRunnerTypeCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  emoji: string;
  description: string;
  background: string;
}

const RunnerTypeCard = forwardRef<HTMLDivElement, IRunnerTypeCardProps>(
  ({ name, emoji, description, background, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          background,
          "card-hover p-4 sm:p-5 md:p-6 text-center group cursor-pointer",
          "min-h-[180px] sm:min-h-[200px] flex flex-col justify-center",
          className
        )}
        {...props}
      >
        <div className='text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-200'>
          {emoji}
        </div>
        <h3 className='font-bold text-gray-800 text-base sm:text-lg mb-2 sm:mb-3'>
          {name}
        </h3>
        <p className='text-gray-600 text-xs sm:text-sm leading-snug sm:leading-relaxed px-2 sm:px-1 md:px-0'>
          {description}
        </p>
      </div>
    );
  }
);

RunnerTypeCard.displayName = "RunnerTypeCard";

export default RunnerTypeCard;
