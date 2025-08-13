import { ITestResultWithTypeInfo } from "@/types/test";
import { getScoreData } from "@/utils/resultUtils";
import { cn } from "../../../lib/utils";

interface IShareCardProps {
  result: ITestResultWithTypeInfo;
  className?: string;
}

// 타입별 그라데이션 매핑
const typeGradients = {
  slow: "bg-gradient-to-br from-green-400 via-green-500 to-emerald-600",
  marathoner: "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600",
  trail: "bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600",
  crew: "bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600",
  style: "bg-gradient-to-br from-pink-400 via-pink-500 to-rose-600",
  race: "bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600",
} as const;

const ShareCard = ({ result, className = "" }: IShareCardProps) => {
  const scoreData = getScoreData(result);
  const maxScore = Math.max(...scoreData.map((s) => s.score));
  const topScores = scoreData.sort((a, b) => b.score - a.score).slice(0, 3);

  const gradientClass =
    typeGradients[result.runnerType as keyof typeof typeGradients] ||
    typeGradients.slow;

  return (
    <div
      className={cn(
        "relative rounded-3xl text-white overflow-hidden",
        gradientClass,
        "w-full max-w-md mx-auto aspect-[4/5]",
        "p-5 sm:p-7",
        className
      )}
    >
      {/* 배경 패턴/텍스처 */}
      <div className='absolute inset-0 bg-gradient-to-br from-white/10 to-transparent' />
      <div className='absolute -top-20 -right-20 bg-white/5 rounded-full w-28 h-28 sm:w-36 sm:h-36' />
      <div className='absolute -bottom-20 -left-20 bg-white/5 rounded-full w-36 h-36 sm:w-52 sm:h-52' />

      {/* 상단 브랜드 워터마크 */}
      <div className='absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1.5'>
        <span className='text-white/80 font-semibold text-sm'>🏃‍♂️ RunVibe</span>
      </div>

      {/* 메인 콘텐츠 */}
      <div className='relative z-10 h-full flex flex-col'>
        {/* 상단: 타이틀 */}
        <div className='text-center mb-5 sm:mb-7'>
          <div className='text-white/80 font-medium mb-2 text-base sm:text-lg'>
            러닝 취향 분석 결과
          </div>
          <h1 className='font-bold leading-tight text-xl sm:text-3xl'>
            나는
            <br />
            <span className='text-2xl sm:text-4xl'>
              {result.typeInfo.name}!
            </span>
          </h1>
        </div>

        {/* 중앙: 대형 이모지 */}
        <div className='flex-1 flex items-center justify-center'>
          <div className='drop-shadow-lg animate-pulse text-5xl sm:text-7xl'>
            {result.typeInfo.emoji}
          </div>
        </div>

        {/* 점수 바 섹션 */}
        <div className='space-y-3 sm:space-y-4 mb-5 sm:mb-7'>
          <div className='text-center text-white/90 font-semibold mb-4 sm:mb-5 text-base sm:text-lg'>
            내 러닝 특성 TOP 3
          </div>

          {topScores.map((score) => {
            const percentage = Math.round(
              (score.score / Math.max(maxScore, 10)) * 100
            );

            return (
              <div
                key={score.key}
                className='flex items-center space-x-3 sm:space-x-4'
              >
                <span className='w-7 sm:w-9 text-xl sm:text-2xl'>
                  {score.emoji}
                </span>
                <div className='flex-1'>
                  <div className='flex justify-between items-center mb-1'>
                    <span className='text-white font-medium text-sm sm:text-base'>
                      {score.label}
                    </span>
                    <span className='text-white/90 font-bold text-sm sm:text-base'>
                      {percentage}%
                    </span>
                  </div>
                  <div className='w-full bg-white/20 rounded-full h-2 sm:h-2.5'>
                    <div
                      className='h-full bg-white rounded-full transition-all duration-1000'
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 하단: 브랜드 & CTA */}
        <div className='text-center'>
          <div className='text-white/60 mb-2 text-sm sm:text-base'>
            나도 테스트해보기 👇
          </div>
          <div className='bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-5 py-2 sm:py-2.5 inline-block text-sm sm:text-base'>
            <span className='font-bold text-white text-base sm:text-lg'>
              RunVibe
            </span>
            <span className='text-white/80 text-sm'>.vercel.app</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
