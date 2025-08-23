"use client";

import {
  ParticipantsCard,
  PodiumChart,
  StatsError,
  StatsLoading,
  TypeDistributionChart,
} from "@/components/stats";
import { BackButton, Button } from "@/components/ui";
import { useStats } from "@/hooks/useStats";
import Link from "next/link";

export default function StatsPageClient() {
  const { stats, loading, error, retry } = useStats();

  if (loading) {
    return <StatsLoading />;
  }

  if (error) {
    return <StatsError onRetry={retry} error={error} />;
  }

  if (!stats || stats.totalParticipants <= 0) {
    return (
      <div className='flex items-center justify-center'>
        <div className='text-center max-w-md mx-auto p-6'>
          <div className='text-6xl mb-4'>📊</div>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>
            아직 데이터가 없어요
          </h2>
          <p className='text-gray-600 mb-6'>첫 번째 테스트를 진행해주세요!</p>
          <Link href='/test'>
            <Button variant='gradient' size='lg'>
              테스트 시작하기 🚀
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='max-w-4xl mx-auto px-6 py-8'>
        <BackButton size='lg' />
        <div className='text-center mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>
            📊 러닝 취향 통계
          </h1>
          <p className='text-gray-600'>지금까지의 분석 결과를 확인해보세요!</p>
        </div>
        <ParticipantsCard totalParticipants={stats.totalParticipants} />
        <PodiumChart podium={stats.podium} />
        <TypeDistributionChart allTypes={stats.allTypes} />
        <div className='text-center'>
          <Link href='/test'>
            <Button variant='gradient' size='lg' className='px-8'>
              나도 테스트 해보기 🏃‍♂️
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
