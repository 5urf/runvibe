import { Button, RunnerTypeCard } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import { getStats } from "../../lib/stats";

const runnerTypes = [
  {
    id: "slow",
    name: "슬로우 러너",
    emoji: "🌱",
    color: "bg-runner-slow border-runner-slow/30",
    description: "느린 페이스로 오래 달리며 여유와 회복을 중시하는 타입",
  },
  {
    id: "marathoner",
    name: "마라토너",
    emoji: "🏅",
    color: "bg-runner-marathoner border-runner-marathoner/30",
    description: "장거리에서 한계를 시험하고 성취를 추구하는 타입",
  },
  {
    id: "trail",
    name: "트레일 러너",
    emoji: "🏔️",
    color: "bg-runner-trail border-runner-trail/30",
    description: "자연과 지형을 즐기며 새로운 코스를 탐험하는 타입",
  },
  {
    id: "crew",
    name: "크루 러너",
    emoji: "👥",
    color: "bg-runner-crew border-runner-crew/30",
    description: "함께 뛰는 동기부여를 선호하고 사회적 활동을 즐기는 타입",
  },
  {
    id: "style",
    name: "패션 러너",
    emoji: "👟",
    color: "bg-runner-style border-runner-style/30",
    description: "러닝을 패션과 라이프스타일의 일부로 즐기는 타입",
  },
  {
    id: "race",
    name: "레이스 헌터",
    emoji: "🥇",
    color: "bg-runner-race border-runner-race/30",
    description: "다양한 러닝 대회를 찾아다니며 참여하는 타입",
  },
];

export default async function HomePage() {
  const { totalParticipants } = await getStats();

  return (
    <div className='min-h-screen'>
      <div className='max-w-4xl mx-auto px-6 pb-12'>
        {/* Hero Section */}
        <section className='text-center py-16'>
          {/* Hero Image */}
          <div className='mb-8'>
            <div className='relative w-full aspect-[5/2] rounded-lg overflow-hidden shadow-md'>
              <Image
                src='/images/hero-runner.png'
                alt='RunVibe 러닝 캐릭터'
                fill
                className='object-cover'
                priority
              />
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
            지금까지{" "}
            <span className='font-bold text-primary-500'>
              {totalParticipants.toLocaleString()}명
            </span>
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
              <RunnerTypeCard
                key={type.id}
                name={type.name}
                emoji={type.emoji}
                description={type.description}
                background={type.color}
              />
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
