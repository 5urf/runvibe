"use client";

import { retakeTest } from "@/app/test/actions";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface IRetakeButtonProps {
  resultId: string;
}

const RetakeButton = ({ resultId }: IRetakeButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRetake = () => {
    startTransition(async () => {
      try {
        await retakeTest(resultId);
        toast.success("새로운 테스트를 시작합니다!", {
          description: "이전 결과는 삭제되었어요 ✨",
          duration: 2000,
        });
        router.push("/test");
      } catch (error) {
        console.error("재참여 오류:", error);
        toast.error("오류가 발생했습니다", {
          description: "다시 시도해주세요",
          duration: 3000,
        });
      }
    });
  };

  return (
    <Button
      variant='secondary'
      className='w-full flex items-center justify-center space-x-2'
      onClick={handleRetake}
      disabled={isPending}
    >
      <span>🔄</span>
      <span>{isPending ? "처리 중..." : "다시 테스트"}</span>
    </Button>
  );
};

export default RetakeButton;
