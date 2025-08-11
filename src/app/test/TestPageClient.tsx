"use client";

import { ProgressBar, QuestionCard, TestNavigation } from "@/components/ui";
import { useAnswerState } from "@/hooks/useAnswerState";
import { useQuestionNavigation } from "@/hooks/useQuestionNavigation";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "sonner";
import { saveTestResult } from "./actions";

const MemoizedProgressBar = React.memo(ProgressBar);
const MemoizedQuestionCard = React.memo(QuestionCard);
const MemoizedTestNavigation = React.memo(TestNavigation);

export default function TestPageClient() {
  const router = useRouter();

  const {
    currentQuestionIndex,
    currentQuestion,
    totalQuestions,
    isLastQuestion,
    canGoPrev,
    goToNext,
    goToPrevious,
  } = useQuestionNavigation();

  const { selectedAnswers, answeredCount, hasAnswer, getAnswer, selectAnswer } =
    useAnswerState();

  const [isCompleting, setIsCompleting] = useState(false);

  const canGoNext = hasAnswer(currentQuestionIndex);

  const handleAnswerSelect = useCallback(
    (optionId: string) => {
      selectAnswer(currentQuestionIndex, optionId);
    },
    [selectAnswer, currentQuestionIndex]
  );

  const handleCompleteTest = useCallback(async () => {
    setIsCompleting(true);

    try {
      const answersArray: string[] = [];
      for (let i = 0; i < totalQuestions; i++) {
        const answer = getAnswer(i);
        if (!answer) {
          throw new Error(`질문 ${i + 1}에 답변이 없습니다.`);
        }
        answersArray.push(answer);
      }

      const resultId = await saveTestResult(answersArray);

      toast.success("테스트가 완료되었습니다!", {
        description: "결과를 확인해보세요 🎉",
        duration: 2000,
      });

      router.push(`/result/${resultId}`);
    } catch (error) {
      console.error("테스트 완료 처리 중 오류:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";

      toast.error("오류가 발생했습니다", {
        description: errorMessage,
        duration: 4000,
      });
    } finally {
      setIsCompleting(false);
    }
  }, [getAnswer, router, totalQuestions]);

  const handleNext = useCallback(() => {
    if (!canGoNext) return;

    if (isLastQuestion) {
      handleCompleteTest();
    } else {
      goToNext();
    }
  }, [canGoNext, isLastQuestion, handleCompleteTest, goToNext]);

  return (
    <main className='min-h-screen'>
      <div className='max-w-4xl mx-auto px-6 py-8'>
        <section aria-label='테스트 진행률' className='mb-8'>
          <MemoizedProgressBar
            current={currentQuestionIndex + 1}
            total={totalQuestions}
          />
        </section>

        <section
          aria-label={`질문 ${currentQuestionIndex + 1}`}
          className='mb-8'
        >
          <MemoizedQuestionCard
            question={currentQuestion}
            selectedAnswer={getAnswer(currentQuestionIndex)}
            onAnswerSelect={handleAnswerSelect}
          />
        </section>

        <div className='mb-8'>
          <MemoizedTestNavigation
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

        {/* 완료 중 상태 표시 */}
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

        {/* 디버그 정보 (개발 중에만) */}
        {process.env.NODE_ENV === "development" && (
          <aside className='mt-8 p-4 bg-gray-100 rounded-lg text-xs text-gray-600'>
            <h3 className='font-semibold mb-2'>디버그 정보</h3>
            <ul>
              <li>
                현재 질문: {currentQuestionIndex + 1}/{totalQuestions}
              </li>
              <li>선택된 답변들: {answeredCount}개</li>
              <li>현재 선택: {getAnswer(currentQuestionIndex) || "없음"}</li>
            </ul>
          </aside>
        )}
      </div>
    </main>
  );
}
