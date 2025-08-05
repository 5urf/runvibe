import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../../lib/utils";

interface IRunnerTypeCardProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  name: string;
  emoji: string;
  description: string;
  background: string;
}

const RunnerTypeCard = forwardRef<HTMLDivElement, IRunnerTypeCardProps>(
  ({ id, name, emoji, description, background, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          background,
          "card-hover p-6 text-center group cursor-pointer",
          className
        )}
        {...props}
      >
        <div className='text-4xl mb-4 group-hover:scale-110 transition-transform duration-200'>
          {emoji}
        </div>
        <h3 className='font-bold text-gray-800 text-lg mb-2'>{name}</h3>
        <p className='text-gray-600 text-sm leading-relaxed mb-2'>
          {description}
        </p>
      </div>
    );
  }
);

RunnerTypeCard.displayName = "RunnerTypeCard";

export default RunnerTypeCard;
