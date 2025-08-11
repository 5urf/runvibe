import { useCallback, useMemo, useState } from "react";

export const useAnswerState = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});

  const selectAnswer = useCallback(
    (questionIndex: number, optionId: string) => {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionIndex]: optionId,
      }));
    },
    []
  );

  const hasAnswer = useCallback(
    (questionIndex: number): boolean => {
      return selectedAnswers[questionIndex] !== undefined;
    },
    [selectedAnswers]
  );

  const getAnswer = useCallback(
    (questionIndex: number): string | undefined => {
      return selectedAnswers[questionIndex];
    },
    [selectedAnswers]
  );

  const isAllAnswered = useCallback(
    (totalQuestions: number): boolean => {
      return Object.keys(selectedAnswers).length === totalQuestions;
    },
    [selectedAnswers]
  );

  const answeredCount = useMemo(() => {
    return Object.keys(selectedAnswers).length;
  }, [selectedAnswers]);

  // 답변 초기화 (필요할 때 사용)
  const resetAnswers = useCallback(() => {
    setSelectedAnswers({});
  }, []);

  // 특정 질문의 답변 삭제
  const removeAnswer = useCallback((questionIndex: number) => {
    setSelectedAnswers((prev) => {
      const { [questionIndex]: removed, ...rest } = prev;
      return rest;
    });
  }, []);

  return {
    selectedAnswers,
    answeredCount,

    hasAnswer,
    getAnswer,
    isAllAnswered,

    selectAnswer,
    removeAnswer,
    resetAnswers,
  };
};
