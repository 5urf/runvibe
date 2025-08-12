import { Button } from "@/components/ui";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className='min-h-screen'>
      <div className='max-w-4xl mx-auto px-6 py-12'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl font-bold text-gray-800 mb-6'>
            🏃‍♂️ RunVibe란?
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            MBTI처럼 재미있지만 더 실용적인
            <br />
            <span className='text-primary-500 font-semibold'>
              러닝 취향 분석 서비스
            </span>
            입니다
          </p>
        </div>

        <div className='space-y-16'>
          {/* 서비스 목적 */}
          <section className='card p-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
              🎯 <span className='ml-3'>서비스 목적</span>
            </h2>
            <div className='text-gray-700 text-lg leading-relaxed space-y-4'>
              <p>
                러닝을 시작하는 많은 분들이{" "}
                <strong>&quot;나에게 맞는 러닝 방법이 뭘까?&quot;</strong>
                고민합니다. RunVibe는 이런 고민을 해결하기 위해 만들어졌어요.
              </p>
              <p>
                15개의 정교한 질문을 통해 당신의 러닝 성향을 분석하고,
                <span className='text-primary-500 font-semibold'>
                  {" "}
                  6가지 러너 타입
                </span>{" "}
                중 어디에 속하는지 알려드립니다.
              </p>
            </div>
          </section>

          {/* 6가지 러너 타입 */}
          <section className='card p-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
              👥 <span className='ml-3'>6가지 러너 타입</span>
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='flex items-start space-x-4'>
                <div className='text-3xl'>🌱</div>
                <div>
                  <h3 className='font-bold text-gray-800'>슬로우 러너</h3>
                  <p className='text-gray-600'>
                    느린 페이스로 오래 달리며 여유와 회복을 중시
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-4'>
                <div className='text-3xl'>🏅</div>
                <div>
                  <h3 className='font-bold text-gray-800'>마라토너</h3>
                  <p className='text-gray-600'>
                    장거리에서 한계를 시험하고 성취를 추구
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-4'>
                <div className='text-3xl'>🏔️</div>
                <div>
                  <h3 className='font-bold text-gray-800'>트레일 러너</h3>
                  <p className='text-gray-600'>
                    자연과 지형을 즐기며 새로운 코스를 탐험
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-4'>
                <div className='text-3xl'>👥</div>
                <div>
                  <h3 className='font-bold text-gray-800'>크루 러너</h3>
                  <p className='text-gray-600'>
                    함께 뛰는 동기부여를 선호하고 사회적 활동을 즐김
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-4'>
                <div className='text-3xl'>👟</div>
                <div>
                  <h3 className='font-bold text-gray-800'>패션 러너</h3>
                  <p className='text-gray-600'>
                    러닝을 패션과 라이프스타일의 일부로 즐김
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-4'>
                <div className='text-3xl'>🥇</div>
                <div>
                  <h3 className='font-bold text-gray-800'>레이스 헌터</h3>
                  <p className='text-gray-600'>
                    다양한 러닝 대회를 찾아다니며 참여
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 이용 방법 */}
          <section className='card p-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
              📝 <span className='ml-3'>이용 방법</span>
            </h2>
            <div className='space-y-6'>
              <div className='flex items-center space-x-4'>
                <div className='w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold'>
                  1
                </div>
                <div>
                  <h3 className='font-semibold text-gray-800'>
                    15개 질문 답변
                  </h3>
                  <p className='text-gray-600'>
                    러닝 페이스, 선호 환경, 목표 등에 대한 질문
                  </p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <div className='w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold'>
                  2
                </div>
                <div>
                  <h3 className='font-semibold text-gray-800'>타입 분석</h3>
                  <p className='text-gray-600'>
                    당신의 답변을 바탕으로 러너 타입 도출
                  </p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <div className='w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold'>
                  3
                </div>
                <div>
                  <h3 className='font-semibold text-gray-800'>친구들과 공유</h3>
                  <p className='text-gray-600'>
                    카카오톡, 인스타그램으로 결과 공유
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className='text-center py-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>
              준비되셨나요? 🚀
            </h2>
            <p className='text-gray-600 mb-8 text-lg'>
              3분이면 당신의 러닝 타입을 알 수 있어요!
            </p>
            <Link href='/test'>
              <Button variant='gradient' size='xl'>
                지금 바로 테스트하기 ✨
              </Button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
