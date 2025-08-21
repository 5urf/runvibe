"use client";

import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";

const ParticipationError = () => {
  const router = useRouter();

  return (
    <main>
      <div className='max-w-4xl mx-auto px-6 py-8'>
        <article className='max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border overflow-hidden'>
          <header className='bg-gradient-to-r from-red-50 to-red-100 px-8 py-12 text-center'>
            <div className='text-6xl mb-4' role='img' aria-label='오류 아이콘'>
              ❌
            </div>
            <h1 className='text-3xl font-bold text-gray-800 mb-4'>
              오류가 발생했습니다
            </h1>
            <p className='text-lg text-gray-600'>참여 정보를 찾을 수 없어요.</p>
          </header>
          <section className='p-8 text-center'>
            <h2 className='sr-only'>오류 해결 방법</h2>
            <p className='text-gray-600 mb-8 leading-relaxed'>
              쿠키 정보가 손상되었거나 만료되었을 수 있어요.
              <br />
              새로운 테스트를 시작해보세요.
            </p>
            <div className='space-y-4' role='group' aria-label='오류 해결 옵션'>
              <Button
                variant='gradient'
                onClick={() => router.push("/test")}
                className='w-full sm:w-auto focus:ring-2 focus:ring-primary-300 focus:ring-offset-2'
                aria-label='새로운 테스트 시작하기'
              >
                새로 테스트 시작하기
              </Button>
              <div>
                <Button
                  variant='secondary'
                  onClick={() => router.push("/")}
                  className='w-full sm:w-auto focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
                  aria-label='홈페이지로 돌아가기'
                >
                  홈으로 돌아가기
                </Button>
              </div>
            </div>
          </section>
          <aside className='bg-gray-50 px-8 py-6 border-t border-gray-100'>
            <div className='flex items-start'>
              <div>
                <h3 className='text-gray-800 font-semibold mb-2'>
                  💡 문제가 계속 발생한다면?
                </h3>
                <p className='text-sm text-gray-600 leading-relaxed'>
                  브라우저 쿠키 설정을 확인하거나, 시크릿 모드가 아닌 일반
                  모드에서 접속해보세요. 여전히 문제가 있다면 페이지를 새로고침
                  후 다시 시도해주세요.
                </p>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
};

export default ParticipationError;
