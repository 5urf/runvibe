"use client";

import { ProgressBar, QuestionCard, TestNavigation } from "@/components/test";
import { useAnswerState } from "@/hooks/useAnswerState";
import { useQuestionNavigation } from "@/hooks/useQuestionNavigation";
import { useTestCompletion } from "@/hooks/useTestCompletion";
import { useCallback } from "react";

export default function TestPageClient() {
  const {
    currentQuestionIndex,
    currentQuestion,
    totalQuestions,
    isLastQuestion,
    canGoPrev,
    goToNext,
    goToPrevious,
  } = useQuestionNavigation();

  const { hasAnswer, getAnswer, selectAnswer } = useAnswerState();

  const { isCompleting, completeTestWithValidation } = useTestCompletion();

  const canGoNext = hasAnswer(currentQuestionIndex);

  const handleAnswerSelect = useCallback(
    (optionId: string) => {
      selectAnswer(currentQuestionIndex, optionId);
    },
    [selectAnswer, currentQuestionIndex]
  );

  const handleNext = useCallback(() => {
    if (!canGoNext) return;

    if (isLastQuestion) {
      completeTestWithValidation(getAnswer, totalQuestions);
    } else {
      goToNext();
    }
  }, [
    canGoNext,
    isLastQuestion,
    completeTestWithValidation,
    getAnswer,
    totalQuestions,
    goToNext,
  ]);

  return (
    <main className='min-h-screen'>
      <div className='max-w-4xl mx-auto px-6 py-8'>
        <section aria-label='테스트 진행률' className='mb-8'>
          <ProgressBar
            current={currentQuestionIndex + 1}
            total={totalQuestions}
          />
        </section>
        <section
          aria-label={`질문 ${currentQuestionIndex + 1}`}
          className='mb-8'
        >
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={getAnswer(currentQuestionIndex)}
            onAnswerSelect={handleAnswerSelect}
          />
        </section>
        <div className='mb-8'>
          <TestNavigation
            currentIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            canGoPrev={canGoPrev}
            canGoNext={canGoNext}
            isLastQuestion={isLastQuestion}
            isLoading={isCompleting}
            onPrevious={goToPrevious}
            onNext={handleNext}
          />
        </div>
        {!canGoNext && (
          <aside className='text-center mt-6' role='status' aria-live='polite'>
            <p className='text-gray-500'>
              답변을 선택하면 다음으로 넘어갈 수 있어요
            </p>
          </aside>
        )}
        {isCompleting && (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-2xl p-8 max-w-sm mx-6 text-center'>
              <div className='animate-spin w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full mx-auto mb-4'></div>
              <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                결과를 분석하고 있어요
              </h3>
              <p className='text-gray-600'>잠시만 기다려주세요 ✨</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
