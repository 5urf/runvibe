import { runnerTypeInfo } from "@/data/runnerTypeInfo";
import { IPodiumItem } from "@/types/stats";
import { typeBorderColors, typeColors } from "@/utils/resultUtils";

interface IPodiumChartProps {
  podium: IPodiumItem[];
}

const PodiumChart = ({ podium }: IPodiumChartProps) => {
  if (podium.length < 3) {
    return (
      <div className='card p-8 mb-8'>
        <h2 className='text-xl font-semibold text-gray-800 mb-6 text-center'>
          🏆 인기 러너 타입 TOP 3
        </h2>
        <div className='text-center text-gray-500 py-8'>
          충분한 데이터가 없습니다.
        </div>
      </div>
    );
  }

  const medals = ["🥇", "🥈", "🥉"];
  const heights: Record<number, string> = {
    0: "h-32 md:h-36",
    1: "h-24 md:h-28",
    2: "h-20 md:h-24",
  };

  return (
    <div className='card p-8 mb-8'>
      <h2 className='text-xl font-semibold text-gray-800 mb-6 text-center'>
        🏆 인기 러너 타입 TOP 3
      </h2>

      <div className='flex justify-center items-end space-x-3 md:space-x-6'>
        {/* 2위, 1위, 3위 */}
        {[1, 0, 2].map((podiumIndex) => {
          const item = podium[podiumIndex];
          if (!item) return null;

          const typeInfo =
            runnerTypeInfo[item.type as keyof typeof runnerTypeInfo];
          const bgColorClass =
            typeColors[item.type as keyof typeof typeColors] || typeColors.slow;
          const borderColorClass =
            typeBorderColors[item.type as keyof typeof typeBorderColors] ||
            typeBorderColors.slow;

          return (
            <div
              key={item.type}
              className='text-center group cursor-pointer transform transition-all duration-300 hover:scale-105 flex-1 max-w-[100px] md:max-w-none'
            >
              <div
                className={`rounded-xl p-3 md:p-6 shadow-lg transition-all duration-300 group-hover:shadow-xl mb-2 md:mb-3 ${heights[podiumIndex]} flex flex-col items-center justify-center border-2 ${bgColorClass} ${borderColorClass}`}
              >
                <span className='text-2xl md:text-4xl mb-1 md:mb-2'>
                  {typeInfo?.emoji}
                </span>
                <span className='text-lg md:text-2xl'>
                  {medals[podiumIndex]}
                </span>
              </div>
              <div className='text-xs md:text-sm font-semibold text-gray-700 mb-1'>
                {typeInfo?.name}
              </div>
              <div className='text-sm md:text-xl font-bold text-gray-800 mb-1'>
                {item.percentage}%
              </div>
              <div className='text-xs text-gray-500'>
                {item.count.toLocaleString()}명
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PodiumChart;
