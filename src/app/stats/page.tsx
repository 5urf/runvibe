import { Button } from "@/components/ui";
import Link from "next/link";

// Mock 데이터
const mockStats = {
  totalParticipants: 1234,
  typeDistribution: [
    { type: "소셜 러너", emoji: "👥", percentage: 28, color: "bg-green-500" },
    { type: "힐링 러너", emoji: "🌿", percentage: 22, color: "bg-purple-500" },
    { type: "스피드 러너", emoji: "⚡", percentage: 18, color: "bg-red-500" },
    { type: "지구력 러너", emoji: "🎯", percentage: 15, color: "bg-blue-500" },
    {
      type: "데이터 러너",
      emoji: "📊",
      percentage: 10,
      color: "bg-indigo-500",
    },
    { type: "챌린지 러너", emoji: "🏆", percentage: 7, color: "bg-yellow-500" },
  ],
};

export default function StatsPage() {
  return (
    <div className='min-h-screen'>
      {/* Header */}
      <header className='px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-white/20'>
        <div className='max-w-4xl mx-auto flex items-center justify-between'>
          <Link href='/' className='text-2xl font-bold text-primary-500'>
            🏃‍♂️ RunVibe
          </Link>
          <div className='text-lg font-bold text-gray-800'>참여 통계</div>
        </div>
      </header>

      <div className='max-w-4xl mx-auto px-6 py-12'>
        <div className='text-center mb-12'>
          <h1 className='text-3xl font-bold text-gray-800 mb-4'>
            📊 러닝 취향 분석 통계
          </h1>
          <p className='text-gray-600 text-lg'>
            지금까지 참여한 러너들의 통계를 확인해보세요
          </p>
        </div>

        {/* 총 참여자 수 */}
        <div className='card p-8 text-center mb-8'>
          <h2 className='text-lg text-gray-600 mb-2'>총 참여자 수</h2>
          <div className='text-5xl font-bold text-primary-500 mb-2'>
            {mockStats.totalParticipants.toLocaleString()}
          </div>
          <div className='text-gray-500'>명이 참여했어요! 🎉</div>
        </div>

        {/* 타입별 분포 */}
        <div className='card p-8'>
          <h2 className='text-2xl font-bold text-gray-800 mb-8 text-center'>
            러너 타입별 분포
          </h2>

          <div className='space-y-6'>
            {mockStats.typeDistribution.map((item) => (
              <div key={item.type} className='flex items-center'>
                <div className='flex items-center min-w-0 flex-1'>
                  <div className='text-2xl mr-3'>{item.emoji}</div>
                  <div className='font-semibold text-gray-800 mr-4 min-w-0 flex-1'>
                    {item.type}
                  </div>
                  <div className='text-lg font-bold text-gray-600 min-w-[60px] text-right'>
                    {item.percentage}%
                  </div>
                </div>
                <div className='w-32 ml-4'>
                  <div className='h-3 bg-gray-200 rounded-full overflow-hidden'>
                    <div
                      className={`h-full ${item.color} transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className='text-center mt-12'>
          <p className='text-gray-600 mb-6 text-lg'>
            아직 테스트를 해보지 않으셨나요?
          </p>
          <Link href='/test'>
            <Button variant='gradient' size='lg'>
              나도 테스트 해보기 🚀
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
