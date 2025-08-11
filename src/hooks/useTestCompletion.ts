import { saveTestResult } from "@/app/test/actions";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export const useTestCompletion = () => {
  const router = useRouter();
  const [isCompleting, setIsCompleting] = useState(false);

  const completeTest = useCallback(
    async (answersArray: string[]) => {
      setIsCompleting(true);

      try {
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
    },
    [router]
  );

  const completeTestWithValidation = useCallback(
    async (
      getAnswer: (index: number) => string | undefined,
      totalQuestions: number
    ) => {
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

        await completeTest(answersArray);
      } catch (error) {
        setIsCompleting(false);

        if (
          error instanceof Error &&
          error.message.includes("답변이 없습니다")
        ) {
          toast.error("답변을 완료해주세요", {
            description: error.message,
            duration: 4000,
          });
        }
      }
    },
    [completeTest]
  );

  // 테스트 재시작 (필요할 때 사용)
  const restartTest = useCallback(() => {
    router.push("/test");
  }, [router]);

  const goHome = useCallback(() => {
    router.push("/");
  }, [router]);

  return {
    isCompleting,

    completeTest,
    completeTestWithValidation,

    restartTest,
    goHome,
  };
};
