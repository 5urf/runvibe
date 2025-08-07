"use client";

import { ProgressBar, QuestionCard, TestNavigation } from "@/components/ui";
import { questions } from "@/data/questions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { saveTestResult } from "./actions";

export default function TestPageClient() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [isCompleting, setIsCompleting] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const canGoNext = selectedAnswers[currentQuestionIndex] !== undefined;
  const canGoPrev = currentQuestionIndex > 0;

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionId,
    }));
  };

  const handlePrevious = () => {
    if (canGoPrev) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!canGoNext) return;

    if (isLastQuestion) {
      handleCompleteTest();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleCompleteTest = async () => {
    setIsCompleting(true);

    try {
      // 답변 배열 생성 (순서대로, 모든 질문에 답변이 있는지 확인)
      const answersArray: string[] = [];
      for (let i = 0; i < questions.length; i++) {
        const answer = selectedAnswers[i];
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
  };

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
            selectedAnswer={selectedAnswers[currentQuestionIndex]}
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
            onPrevious={handlePrevious}
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
              <li>선택된 답변들: {Object.keys(selectedAnswers).length}개</li>
              <li>
                현재 선택: {selectedAnswers[currentQuestionIndex] || "없음"}
              </li>
            </ul>
          </aside>
        )}
      </div>
    </main>
  );
}
