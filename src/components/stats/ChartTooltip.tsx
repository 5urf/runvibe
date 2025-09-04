interface IChartData {
  name: string;
  value: number;
  count: number;
  emoji: string;
  type: string;
}

interface IChartTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: IChartData }>;
}

const ChartTooltip = ({ active, payload }: IChartTooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className='bg-white p-3 rounded-lg shadow-lg border border-gray-200'>
      <p className='font-semibold text-gray-800 mb-1'>
        {data.emoji} {data.name}
      </p>
      <p className='text-primary-500 text-sm'>
        {data.value}% ({data.count.toLocaleString()}명)
      </p>
    </div>
  );
};

export default ChartTooltip;
