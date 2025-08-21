import { Button } from "@/components/ui";
import Link from "next/link";

interface IStatsErrorProps {
  onRetry: () => void;
  error?: string;
}

const StatsError = ({ onRetry, error }: IStatsErrorProps) => {
  return (
    <div className='flex items-center justify-center'>
      <div className='text-center max-w-md mx-auto p-6'>
        <div className='text-6xl mb-4'>😵</div>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>
          통계를 불러올 수 없어요
        </h2>
        <p className='text-gray-600 mb-6'>
          {error || "일시적인 문제가 발생했습니다. 다시 시도해 주세요."}
        </p>

        <div className='flex flex-col gap-3'>
          <Button variant='primary' onClick={onRetry} className='w-full'>
            🔄 다시 시도
          </Button>
          <Link href='/'>
            <Button variant='secondary' className='w-full'>
              🏠 홈으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StatsError;
