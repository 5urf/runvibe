import { questions } from "@/data/questions";
import { useCallback, useMemo, useState } from "react";

export const useQuestionNavigation = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const totalQuestions = useMemo(() => questions.length, []);
  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [currentQuestionIndex]
  );
  const isLastQuestion = useMemo(
    () => currentQuestionIndex === totalQuestions - 1,
    [currentQuestionIndex, totalQuestions]
  );
  const canGoPrev = useMemo(
    () => currentQuestionIndex > 0,
    [currentQuestionIndex]
  );

  const goToNext = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex, totalQuestions]);

  const goToPrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  // 특정 질문으로 바로 이동
  const goToQuestion = useCallback(
    (questionIndex: number) => {
      if (questionIndex >= 0 && questionIndex < totalQuestions) {
        setCurrentQuestionIndex(questionIndex);
      }
    },
    [totalQuestions]
  );

  return {
    currentQuestionIndex,
    currentQuestion,
    totalQuestions,
    isLastQuestion,
    canGoPrev,

    goToNext,
    goToPrevious,
    goToQuestion,
  };
};
