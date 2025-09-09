import { Button, RunnerTypeCard } from "@/components/ui";
import { runnerTypeInfo } from "@/data/runnerTypeInfo";
import Image from "next/image";
import Link from "next/link";
import { getStats } from "../../lib/stats";

const runnerTypes = Object.entries(runnerTypeInfo).map(([id, info], index) => {
  const colors = [
    "bg-runner-slow border-runner-slow/30",
    "bg-runner-marathoner border-runner-marathoner/30",
    "bg-runner-trail border-runner-trail/30",
    "bg-runner-crew border-runner-crew/30",
    "bg-runner-style border-runner-style/30",
    "bg-runner-race border-runner-race/30",
  ];
  return {
    id,
    name: info.name,
    emoji: info.emoji,
    description: info.description,
    color: colors[index],
  };
});

export default async function HomePage() {
  let totalParticipants = 0;
  try {
    const stats = await getStats();
    totalParticipants = stats.totalParticipants;
  } catch (error) {
    console.error("Failed to fetch stats for HomePage:", error);
  }

  return (
    <div className='min-h-screen'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 pb-12'>
        {/* Hero Section */}
        <section className='text-center py-8 sm:py-16'>
          {/* Hero Image */}
          <div className='mb-6 sm:mb-8'>
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

          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight px-2'>
            <p>나는 어떤</p>
            <p>
              <span className='text-primary-500'>러너 </span>
              일까?
            </p>
          </h1>

          <div className='mb-8 sm:mb-10'>
            <p className='text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-sm sm:max-w-lg md:max-w-2xl mx-auto px-4'>
              <span className='block mb-1'>간단한 테스트로 나만의</span>
              <span className='block mb-1'>러닝 스타일을 찾아보세요.</span>
            </p>
            <p className='text-sm sm:text-base md:text-lg text-gray-500 mt-3 px-4'>
              MBTI보다 재미있고, 빠르게!
            </p>
          </div>

          <Link href='/test'>
            <Button variant='gradient' size='2xl' className='mb-6 sm:mb-8'>
              🚀 테스트 시작하기
            </Button>
          </Link>

          <div className='text-base sm:text-lg text-gray-500 px-4'>
            지금까지{" "}
            <span className='font-bold text-primary-500'>
              {totalParticipants.toLocaleString()}명
            </span>
            이 참여했어요! 🎉
          </div>
        </section>

        {/* Runner Types Preview */}
        <section className='py-8 sm:py-12'>
          <h2 className='text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-3 sm:mb-4 px-4'>
            6가지 러너 타입
          </h2>
          <p className='text-center text-gray-600 mb-8 sm:mb-12 text-base sm:text-lg px-4'>
            당신은 어떤 타입의 러너인가요?
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
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
        <section className='text-center py-12 sm:py-16'>
          <div className='card p-6 sm:p-8 md:p-10 max-w-sm sm:max-w-lg md:max-w-2xl mx-auto'>
            <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight px-2'>
              <span className='block'>나만의 러닝 스타일 발견하고</span>
              <span className='block mt-1'>친구들과 공유해보세요! 🏃‍♀️</span>
            </h3>

            <div className='mb-6 sm:mb-8'>
              <p className='text-gray-600 text-base sm:text-lg leading-relaxed px-2'>
                <span className='block mb-1'>결과를 카카오톡이나</span>
                <span className='block mb-1'>인스타그램으로 공유하고</span>
              </p>
              <p className='text-gray-600 text-sm sm:text-base mt-2 px-2'>
                친구들도 함께 참여해보세요!
              </p>
            </div>
            <Link href='/test'>
              <Button variant='primary' size='xl'>
                지금 바로 시작하기 ✨
              </Button>
            </Link>
          </div>
        </section>

        {/* Bottom Navigation */}
        <nav className='flex flex-wrap justify-center items-center space-x-6 sm:space-x-8 py-6 sm:py-8 text-base sm:text-lg'>
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
