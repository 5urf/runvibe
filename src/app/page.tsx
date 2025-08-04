"use client";

import { Button } from "@/components/ui";
import Link from "next/link";

// 러너 타입 mock 데이터
const runnerTypes = [
  {
    id: "jogger",
    name: "조깅 러너",
    emoji: "🌱",
    color: "bg-runner-green border-green-200",
    description: "여유로운 페이스로 힐링과 건강관리를 추구하는 타입",
  },
  {
    id: "speedster",
    name: "스피드 러너",
    emoji: "⚡",
    color: "bg-runner-red border-red-200",
    description: "빠른 페이스로 짧은 거리를 선호하는 타입",
  },
  {
    id: "endurance",
    name: "지구력 러너",
    emoji: "🎯",
    color: "bg-runner-blue border-blue-200",
    description: "장거리를 꾸준한 페이스로 완주하는 타입",
  },
  {
    id: "explorer",
    name: "모험 러너",
    emoji: "🏔️",
    color: "bg-runner-purple border-purple-200",
    description: "새로운 코스 탐험과 트레일을 선호하는 타입",
  },
  {
    id: "social",
    name: "소셜 러너",
    emoji: "👥",
    color: "bg-runner-yellow border-yellow-200",
    description: "함께 뛰며 크루 활동을 즐기는 타입",
  },
  {
    id: "analyzer",
    name: "데이터 러너",
    emoji: "📊",
    color: "bg-runner-indigo border-indigo-200",
    description: "기록 분석과 체계적 훈련을 중시하는 타입",
  },
];

export default function HomePage() {
  return (
    <div className='min-h-screen'>
      {/* Header */}
      <header className='px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-white/20'>
        <div className='max-w-4xl mx-auto flex items-center justify-between'>
          <div className='text-2xl font-bold text-primary-500'>🏃‍♂️ RunVibe</div>
          <div className='text-lg font-bold text-gray-800'>러닝 취향 분석</div>
        </div>
      </header>

      <div className='max-w-4xl mx-auto px-6 pb-12'>
        {/* Hero Section */}
        <section className='text-center py-16'>
          {/* Hero Image Placeholder */}
          <div className='mb-8'>
            <div className='w-full h-64 bg-gradient-to-r from-primary-400 to-pink-400 rounded-2xl mx-auto shadow-lg flex items-center justify-center'>
              <div className='text-center text-white'>
                <div className='text-6xl mb-4'>🏃‍♂️</div>
                <div className='text-xl font-semibold'>Dynamic Runner</div>
              </div>
            </div>
          </div>

          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight'>
            나는 어떤
            <br />
            <span className='text-primary-500'>러너</span>일까?
          </h1>

          <p className='text-gray-600 mb-10 text-lg md:text-xl max-w-2xl mx-auto'>
            간단한 테스트로 나만의 러닝 스타일을 찾아보세요.
            <br />
            MBTI처럼 재미있게, 하지만 더 실용적으로!
          </p>

          <Link href='/test'>
            <Button variant='gradient' size='2xl' className='mb-8'>
              🚀 테스트 시작하기
            </Button>
          </Link>

          <div className='text-gray-500 text-lg'>
            지금까지 <span className='font-bold text-primary-500'>1,234명</span>
            이 참여했어요! 🎉
          </div>
        </section>

        {/* Runner Types Preview */}
        <section className='py-12'>
          <h2 className='text-3xl font-bold text-center text-gray-800 mb-4'>
            6가지 러너 타입
          </h2>
          <p className='text-center text-gray-600 mb-12 text-lg'>
            당신은 어떤 타입의 러너인가요?
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {runnerTypes.map((type) => (
              <div
                key={type.id}
                className={`${type.color} card-hover p-6 text-center group cursor-pointer`}
              >
                <div className='text-4xl mb-4 group-hover:scale-110 transition-transform duration-200'>
                  {type.emoji}
                </div>
                <h3 className='font-bold text-gray-800 text-lg mb-2'>
                  {type.name}
                </h3>
                <p className='text-gray-600 text-sm leading-relaxed mb-2'>
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className='text-center py-16'>
          <div className='card p-10 max-w-2xl mx-auto'>
            <h3 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6'>
              나만의 러닝 스타일을 발견하고
              <br />
              친구들과 공유해보세요! 🏃‍♀️
            </h3>
            <p className='text-gray-600 mb-8 text-lg'>
              결과를 카카오톡이나 인스타그램으로 공유하고
              <br />
              친구들도 함께 참여해보세요!
            </p>
            <Link href='/test'>
              <Button variant='primary' size='xl'>
                지금 바로 시작하기 ✨
              </Button>
            </Link>
          </div>
        </section>

        {/* Bottom Navigation */}
        <nav className='flex flex-wrap justify-center items-center space-x-8 py-8 text-lg'>
          <Link
            href='/stats'
            className='text-gray-600 hover:text-primary-500 transition-colors'
          >
            📊 통계 보기
          </Link>
          <span className='text-gray-300'>|</span>
          <Link
            href='/about'
            className='text-gray-600 hover:text-primary-500 transition-colors'
          >
            ℹ️ 서비스 소개
          </Link>
        </nav>
      </div>
    </div>
  );
}
