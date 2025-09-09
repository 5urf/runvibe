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

  const displayUrl = (
    process.env.NEXT_PUBLIC_BASE_URL || "runvibe-kr.vercel.app"
  )
    .replace("https://", "")
    .replace("http://", "");

  return (
    <div
      className={cn(
        "relative rounded-3xl text-white overflow-hidden",
        gradientClass,
        "w-full max-w-md mx-auto h-auto sm:aspect-[4/5]",
        "p-3 sm:p-4 md:p-5 lg:p-7",
        className
      )}
    >
      {/* 배경 패턴/텍스처 */}
      <div className='absolute inset-0 bg-gradient-to-br from-white/10 to-transparent' />
      <div className='absolute -top-20 -right-20 bg-white/5 rounded-full w-28 h-28 sm:w-36 sm:h-36' />
      <div className='absolute -bottom-20 -left-20 bg-white/5 rounded-full w-36 h-36 sm:w-52 sm:h-52' />

      {/* 상단 브랜드 워터마크 */}
      <div className='absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 lg:top-4 lg:right-4 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1 sm:px-2.5 sm:py-1.5'>
        <span className='text-white/80 font-semibold text-xs sm:text-sm md:text-sm lg:text-sm'>
          🏃‍♂️ RunVibe
        </span>
      </div>

      {/* 메인 콘텐츠 */}
      <div className='relative z-10 h-full flex flex-col'>
        {/* 상단: 타이틀 */}
        <div className='text-center'>
          <div className='text-white/80 font-medium mb-2 text-sm sm:text-base md:text-base lg:text-lg'>
            러닝 취향 분석 결과
          </div>
          <h1 className='font-bold leading-tight text-lg sm:text-xl md:text-2xl lg:text-3xl'>
            나는
            <br />
            <span className='text-xl sm:text-2xl md:text-3xl lg:text-4xl'>
              {result.typeInfo.name}!
            </span>
          </h1>
        </div>

        {/* 중앙: 대형 이모지 */}
        <div className='flex-1 flex items-center justify-center my-2 sm:my-0'>
          <div className='drop-shadow-lg animate-pulse text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>
            {result.typeInfo.emoji}
          </div>
        </div>

        {/* 점수 바 섹션 */}
        <div className='space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4 mb-4 sm:mb-5 md:mb-6 lg:mb-7'>
          <div className='text-center text-white/90 font-semibold mb-3 sm:mb-4 md:mb-4 lg:mb-5 text-sm sm:text-base md:text-base lg:text-lg'>
            내 러닝 특성 TOP 3
          </div>

          {topScores.map((score) => {
            const percentage = Math.round(
              (score.score / Math.max(maxScore, 10)) * 100
            );

            return (
              <div
                key={score.key}
                className='flex items-center space-x-2 sm:space-x-3 md:space-x-3 lg:space-x-4'
              >
                <span className='w-6 sm:w-7 md:w-8 lg:w-9 text-lg sm:text-xl md:text-xl lg:text-2xl'>
                  {score.emoji}
                </span>
                <div className='flex-1'>
                  <div className='flex justify-between items-center mb-1'>
                    <span className='text-white font-medium text-xs sm:text-sm md:text-sm lg:text-base'>
                      {score.label}
                    </span>
                    <span className='text-white/90 font-bold text-xs sm:text-sm md:text-sm lg:text-base'>
                      {percentage}%
                    </span>
                  </div>
                  <div className='w-full bg-white/20 rounded-full h-1.5 sm:h-2 md:h-2 lg:h-2.5'>
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
        <div className='text-center mt-auto'>
          <div className='text-white/60 mb-2 text-xs sm:text-sm md:text-sm lg:text-base'>
            나도 테스트해보기 👇
          </div>
          <div className='bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-5 lg:py-2.5 inline-block text-xs sm:text-sm md:text-sm lg:text-base'>
            <span className='font-bold text-white text-sm sm:text-base md:text-base lg:text-lg'>
              {displayUrl.split(".")[0]}
            </span>
            <span className='text-white/80 text-xs sm:text-sm md:text-sm'>
              .{displayUrl.split(".").slice(1).join(".")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
