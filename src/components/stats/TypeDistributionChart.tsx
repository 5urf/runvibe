import { CHART_COLORS, CHART_CONFIG } from "@/constants/chartConfig";
import { runnerTypeInfo } from "@/data/runnerTypeInfo";
import { IRunnerTypeStats } from "@/types/stats";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ChartTooltip from "./ChartTooltip";

interface ITypeDistributionChartProps {
  allTypes: IRunnerTypeStats[];
}

const TypeDistributionChart = ({ allTypes }: ITypeDistributionChartProps) => {
  if (!allTypes || allTypes.length === 0) {
    return (
      <div className='card p-8 mb-8'>
        <h2 className='text-xl font-semibold text-gray-800 mb-6 text-center'>
          📊 전체 타입별 분포
        </h2>
        <div className='flex items-center justify-center h-64 bg-gray-50 rounded-xl'>
          <div className='text-center text-gray-500'>
            <div className='text-4xl mb-2'>📊</div>
            <p>아직 데이터가 없습니다</p>
          </div>
        </div>
      </div>
    );
  }

  // 차트 데이터 변환
  const chartData = allTypes.map((typeData) => {
    const typeInfo =
      runnerTypeInfo[typeData.type as keyof typeof runnerTypeInfo];
    return {
      name: typeInfo?.name || typeData.type,
      value: typeData.percentage,
      count: typeData.count,
      emoji: typeInfo?.emoji || "🏃",
      type: typeData.type,
    };
  });

  const totalParticipants = allTypes.reduce((sum, type) => sum + type.count, 0);

  return (
    <div className='card p-8 mb-8'>
      <h2 className='text-xl font-semibold text-gray-800 mb-6 text-center'>
        📊 전체 타입별 분포
      </h2>

      {/* 도넛차트 컨테이너 */}
      <div className='relative'>
        <div className='h-80 w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={chartData}
                cx='50%'
                cy='50%'
                innerRadius={CHART_CONFIG.innerRadius}
                outerRadius={CHART_CONFIG.outerRadius}
                paddingAngle={CHART_CONFIG.paddingAngle}
                dataKey='value'
                stroke={CHART_CONFIG.strokeColor}
                strokeWidth={CHART_CONFIG.strokeWidth}
                className='[&_path]:outline-none [&_path]:focus:outline-none'
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[entry.type as keyof typeof CHART_COLORS]}
                    className='hover:opacity-80 transition-opacity duration-200 outline-none focus:outline-none'
                  />
                ))}
              </Pie>
              <Tooltip
                content={<ChartTooltip />}
                wrapperStyle={{ outline: "none" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 중앙 총 참여자 수 */}
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <div className='text-center'>
            <div className='text-2xl md:text-3xl font-bold text-gray-800'>
              {totalParticipants.toLocaleString()}
            </div>
            <div className='text-sm text-gray-500'>총 참여자</div>
          </div>
        </div>
      </div>

      {/* 범례 */}
      <div className='flex flex-wrap justify-center gap-x-6 gap-y-3 mt-6'>
        {chartData.map((item) => (
          <div key={item.type} className='flex items-center space-x-2'>
            <div
              className='w-4 h-4 rounded-full border border-gray-300 flex-shrink-0'
              style={{
                backgroundColor:
                  CHART_COLORS[item.type as keyof typeof CHART_COLORS],
              }}
            />
            <span className='text-sm font-medium text-gray-700 truncate'>
              {item.emoji} {item.name}
            </span>
            <span className='text-sm text-gray-500 flex-shrink-0'>
              {item.value.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypeDistributionChart;
