interface IScoreBarProps {
  label: string;
  emoji: string;
  score: number;
  maxScore: number;
  isHighest?: boolean;
}

const ScoreBar = ({
  label,
  emoji,
  score,
  maxScore,
  isHighest = false,
}: IScoreBarProps) => {
  const percentage = Math.round((score / maxScore) * 100);

  return (
    <div className='flex items-center space-x-3 mb-3'>
      <span className='text-2xl w-8'>{emoji}</span>
      <div className='flex-1'>
        <div className='flex justify-between items-center mb-1'>
          <span
            className={`text-sm font-medium ${isHighest ? "text-primary-600 font-bold" : "text-gray-600"}`}
          >
            {label}
          </span>
          <span
            className={`text-sm font-bold ${isHighest ? "text-primary-600" : "text-gray-500"}`}
          >
            {score}점
          </span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2 overflow-hidden'>
          <div
            className={`h-full transition-all duration-1000 ease-out ${
              isHighest
                ? "bg-gradient-to-r from-primary-400 to-primary-600"
                : "bg-gray-400"
            } ${isHighest ? "animate-pulse" : ""}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScoreBar;
