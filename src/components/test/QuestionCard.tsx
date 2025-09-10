import { IOption, IQuestion } from "@/types/test";
import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../../lib/utils";

interface IQuestionCardProps extends HTMLAttributes<HTMLDivElement> {
  question: IQuestion;
  selectedAnswer?: string; // 선택된 답변의 option id
  onAnswerSelect: (optionId: string) => void;
}

const QuestionCard = forwardRef<HTMLDivElement, IQuestionCardProps>(
  ({ question, selectedAnswer, onAnswerSelect, className, ...props }, ref) => {
    const handleOptionClick = (option: IOption) => {
      onAnswerSelect(option.id);
    };

    return (
      <div
        ref={ref}
        className={cn("card p-6 sm:p-8 w-full mx-auto", className)}
        {...props}
      >
        <div className='text-center mb-8 flex items-center justify-center min-h-[6rem] sm:min-h-0'>
          <h2
            className={cn(
              "text-xl sm:text-2xl font-bold text-gray-800 leading-relaxed",
              "whitespace-pre-line sm:whitespace-normal"
            )}
          >
            {question.title}
          </h2>
        </div>
        <div className='space-y-4'>
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option.id;

            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className={cn(
                  "w-full p-4 sm:p-5 rounded-xl border-2 text-left transition-all duration-200",
                  "flex items-center space-x-4 group hover:scale-[1.02]",
                  "min-h-[5rem]",
                  isSelected
                    ? "border-primary-500 bg-primary-50 shadow-lg"
                    : "border-gray-200 bg-white hover:border-primary-300 hover:shadow-md"
                )}
                aria-pressed={isSelected}
              >
                <div
                  className={cn(
                    "text-3xl transition-transform duration-200",
                    "group-hover:scale-110",
                    isSelected && "scale-110"
                  )}
                >
                  {option.emoji}
                </div>
                <div className='flex-1'>
                  <span
                    className={cn(
                      "text-base sm:text-lg font-medium transition-colors duration-200",
                      "whitespace-pre-line sm:whitespace-normal",
                      isSelected ? "text-primary-700" : "text-gray-700"
                    )}
                  >
                    {option.text}
                  </span>
                </div>
                <div
                  className={cn(
                    "text-primary-500 w-6 h-6 transition-opacity",
                    isSelected ? "opacity-100" : "opacity-0"
                  )}
                >
                  <svg
                    className='w-full h-full'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
        {!selectedAnswer && (
          <div className='text-center mt-6'>
            <p className='text-gray-500 text-sm'>
              가장 가까운 답변을 선택해 주세요.
            </p>
          </div>
        )}
      </div>
    );
  }
);

QuestionCard.displayName = "QuestionCard";

export default QuestionCard;
