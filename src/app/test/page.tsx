import { Button } from "@/components/ui";
import Link from "next/link";

export default function TestPage() {
  return (
    <div className='min-h-screen'>
      {/* Header */}
      <header className='px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-white/20'>
        <div className='max-w-4xl mx-auto flex items-center justify-between'>
          <Link href='/' className='text-2xl font-bold text-primary-500'>
            🏃‍♂️ RunVibe
          </Link>
          <div className='text-lg font-bold text-gray-800'>
            러닝 취향 분석 테스트
          </div>
        </div>
      </header>

      <div className='max-w-2xl mx-auto px-6 py-16'>
        <div className='text-center mb-12'>
          <h1 className='text-3xl font-bold text-gray-800 mb-4'>
            러닝 취향 분석 테스트
          </h1>
          <p className='text-gray-600 text-lg'>
            15개의 질문으로 당신의 러닝 스타일을 분석해드려요
          </p>
        </div>

        {/* Coming Soon */}
        <div className='card p-12 text-center'>
          <div className='text-6xl mb-8'>🚧</div>
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>
            곧 출시될 예정입니다!
          </h2>
          <p className='text-gray-600 mb-8 text-lg'>
            15개의 정교한 질문이 준비 중이에요.
            <br />
            조금만 기다려주세요! 🏃‍♂️
          </p>
          <Link href='/'>
            <Button variant='primary'>홈으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
