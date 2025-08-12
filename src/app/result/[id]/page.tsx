import { RetakeButton, ScoreBar } from "@/components/result";
import { Button } from "@/components/ui";
import { getScoreData, getTypeBackgroundColor } from "@/utils/resultUtils";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "../../../../lib/utils";
import { getTestResult } from "./actions";

interface IResultPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: IResultPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getTestResult(id);

  if (!result) {
    return {
      title: "결과를 찾을 수 없습니다",
    };
  }

  return {
    title: `나는 ${result.typeInfo.name}!`,
    description: `${result.typeInfo.description}`,
    openGraph: {
      title: `나는 ${result.typeInfo.name}!`,
      description: result.typeInfo.description,
      type: "website",
    },
  };
}

export default async function ResultPage({ params }: IResultPageProps) {
  const { id } = await params;
  const result = await getTestResult(id);

  if (!result) {
    notFound();
  }

  const scoreData = getScoreData(result);
  const maxScore = Math.max(...scoreData.map((s) => s.score));
  const bgColorClass = getTypeBackgroundColor(result.runnerType);
  console.log("📢[page.tsx:47]: bgColorClass: ", bgColorClass);

  return (
    <main className='min-h-screen'>
      <div className='max-w-lg mx-auto px-6 py-8'>
        <section
          className={cn(
            bgColorClass,
            "rounded-3xl p-8 mb-8 text-center relative overflow-hidden"
          )}
        >
          <div className='absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none' />

          <div className='relative z-10'>
            <div className='text-8xl mb-4 animate-bounce'>
              {result.typeInfo.emoji}
            </div>

            <h1 className='text-3xl font-bold text-gray-800 mb-3'>
              나는{" "}
              <span className='text-primary-600'>{result.typeInfo.name}</span>!
            </h1>

            <p className='text-gray-600 leading-relaxed'>
              {result.typeInfo.description}
            </p>
          </div>
        </section>

        <section className='bg-white rounded-3xl p-8 mb-8 shadow-card'>
          <h2 className='text-xl font-bold text-gray-800 mb-6 text-center'>
            📊 나의 러닝 성향 분석
          </h2>

          <div className='space-y-1'>
            {scoreData.map((scoreItem) => (
              <ScoreBar
                key={scoreItem.key}
                label={scoreItem.label}
                emoji={scoreItem.emoji}
                score={scoreItem.score}
                maxScore={Math.max(maxScore, 10)}
                isHighest={scoreItem.score === maxScore}
              />
            ))}
          </div>

          <div className='mt-6 p-4 bg-primary-50 rounded-2xl'>
            <div className='flex items-center justify-center space-x-2'>
              <span className='text-primary-600'>✨</span>
              <span className='text-sm text-primary-700 font-medium'>
                <strong>
                  {scoreData.find((s) => s.score === maxScore)?.label}
                </strong>{" "}
                성향이 가장 강해요!
              </span>
            </div>
          </div>
        </section>

        <section className='space-y-4'>
          <Button
            variant='gradient'
            size='lg'
            className='w-full flex items-center justify-center space-x-2 text-lg py-4'
          >
            <span className='text-2xl'>📱</span>
            <span>결과 공유하기</span>
          </Button>

          <div className='grid grid-cols-2 gap-3'>
            <RetakeButton resultId={result.id} />
            <Link href='/'>
              <Button
                variant='secondary'
                className='w-full flex items-center justify-center space-x-2'
              >
                <span>🏠</span>
                <span>홈으로</span>
              </Button>
            </Link>
          </div>
        </section>

        <footer className='text-center mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl'>
          <p className='text-sm text-gray-500 leading-relaxed'>
            친구들도 자신의 러닝 타입이 궁금하지 않을까요? 🤔
            <br />
            <span className='font-medium text-gray-600'>
              결과를 공유해서 함께 테스트해보세요!
            </span>
          </p>
        </footer>

        {process.env.NODE_ENV === "development" && (
          <details className='mt-8 p-4 bg-gray-100 rounded-lg text-xs'>
            <summary className='cursor-pointer font-semibold text-gray-700 mb-2'>
              🔍 디버그 정보
            </summary>
            <div className='space-y-1 text-gray-600'>
              <div>
                <strong>결과 ID:</strong> {result.id}
              </div>
              <div>
                <strong>러너 타입:</strong> {result.runnerType}
              </div>
              <div>
                <strong>최고 점수:</strong> {maxScore}점
              </div>
            </div>
          </details>
        )}
      </div>
    </main>
  );
}
