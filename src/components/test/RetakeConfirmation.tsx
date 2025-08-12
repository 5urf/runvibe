"use client";

import { retakeTest } from "@/app/test/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ParticipationError from "./ParticipationError";

interface IRetakeConfirmationProps {
  existingResultId: string | null;
}

const RetakeConfirmation = ({ existingResultId }: IRetakeConfirmationProps) => {
  const router = useRouter();
  const [isRetaking, setIsRetaking] = useState(false);

  if (!existingResultId) {
    return <ParticipationError />;
  }

  const handleRetake = async () => {
    setIsRetaking(true);

    try {
      await retakeTest(existingResultId);

      toast.success("새로운 테스트를 시작합니다!", {
        description: "이전 결과는 삭제되었어요 ✨",
        duration: 2000,
      });

      router.refresh();
    } catch (error) {
      console.error("재참여 처리 오류:", error);

      toast.error("오류가 발생했습니다", {
        description: "다시 시도해주세요",
        duration: 3000,
      });

      setIsRetaking(false);
    }
  };

  return (
    <main className='min-h-screen '>
      <div className='max-w-4xl mx-auto px-6 py-8'>
        <article className='max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border overflow-hidden'>
          <header className='bg-gradient-to-r from-blue-50 to-indigo-100 px-8 py-12 text-center'>
            <div
              className='text-6xl mb-4'
              role='img'
              aria-label='고민하는 이모지'
            >
              🤔
            </div>
            <h1 className='text-3xl font-bold text-gray-800 mb-4'>
              이미 참여하셨네요!
            </h1>
            <p className='text-lg text-gray-600'>어떻게 하시겠어요?</p>
          </header>
          <section className='p-8'>
            <h2 className='sr-only'>재참여 옵션 선택</h2>
            <div className='space-y-4 mb-8'>
              <Link
                href={`/result/${existingResultId}`}
                aria-label='기존 테스트 결과 확인하기'
              >
                <div className='card p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer border-2 border-transparent hover:border-primary-200 focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-100'>
                  <div className='flex items-center'>
                    <span
                      className='text-4xl mr-4'
                      role='img'
                      aria-label='결과 보기 아이콘'
                    >
                      👀
                    </span>
                    <div className='flex-1'>
                      <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                        기존 결과 보기
                      </h3>
                      <p className='text-gray-600'>
                        이전 테스트 결과를 확인해요
                      </p>
                    </div>
                    <div className='text-primary-500' aria-hidden='true'>
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
              <button
                className='w-full card p-6 cursor-pointer border-2 border-transparent hover:border-primary-300 hover:shadow-lg transition-all duration-200 focus:border-primary-300 focus:ring-2 focus:ring-primary-100 disabled:opacity-50 disabled:cursor-not-allowed'
                onClick={handleRetake}
                disabled={isRetaking}
                aria-label={
                  isRetaking
                    ? "테스트 재참여 처리 중"
                    : "새로운 테스트 시작하기"
                }
              >
                <div className='flex items-center text-left'>
                  <span
                    className='text-4xl mr-4'
                    role='img'
                    aria-label='재시작 아이콘'
                  >
                    🔄
                  </span>
                  <div className='flex-1'>
                    <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                      {isRetaking ? "처리 중..." : "다시 테스트하기"}
                    </h3>
                    <p className='text-gray-600'>
                      기존 결과는 삭제되고 새로 시작해요
                    </p>
                  </div>
                  <div className='text-primary-500' aria-hidden='true'>
                    {isRetaking ? (
                      <div
                        className='animate-spin w-6 h-6 border-2 border-primary-200 border-t-primary-500 rounded-full'
                        role='status'
                        aria-label='로딩 중'
                      ></div>
                    ) : (
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            </div>
            <aside className='bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8'>
              <div className='flex items-start'>
                <div>
                  <h4 className='text-amber-800 font-semibold mb-2'>
                    ⚠️ 재참여 시 주의사항
                  </h4>
                  <p className='text-sm text-amber-700 leading-relaxed'>
                    다시 테스트하면 <strong>이전 결과가 완전히 삭제</strong>되며
                    복구할 수 없어요. 공정한 통계를 위해 한 번에 하나의 결과만
                    유지돼요.
                  </p>
                </div>
              </div>
            </aside>
            <nav className='text-center'>
              <Link
                href='/'
                className='text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-100 rounded px-2 py-1'
                aria-label='홈페이지로 돌아가기'
              >
                ← 홈으로 돌아가기
              </Link>
            </nav>
          </section>
        </article>
      </div>
    </main>
  );
};

export default RetakeConfirmation;
