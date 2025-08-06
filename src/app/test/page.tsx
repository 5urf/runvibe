"use client";

import { ProgressBar, QuestionCard, TestNavigation } from "@/components/ui";
import { questions } from "@/data/questions";
import { runnerTypeInfo } from "@/data/runnerTypeInfo";
import { RunnerType } from "@/types/test";
import { calculateRunnerType } from "@/utils/calculateScore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TestPage() {
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
      // 테스트 완료 - 결과 계산 및 페이지 이동
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

      const resultType: RunnerType = calculateRunnerType(answersArray);
      const typeInfo = runnerTypeInfo[resultType];

      // 결과 페이지로 이동 (임시로 알럿)
      alert(
        `테스트 완료! 당신은 ${typeInfo.name} ${typeInfo.emoji} 입니다!\n\n${typeInfo.description}`
      );

      // TODO: 실제로는 결과 페이지로 리디렉트
      // router.push(`/result/${resultId}`);
    } catch (error) {
      console.error("테스트 완료 처리 중 오류:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
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
