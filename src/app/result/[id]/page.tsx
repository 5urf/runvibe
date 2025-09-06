import { ScoreBar } from "@/components/result";
import { getScoreData, getTypeBackgroundColor } from "@/utils/resultUtils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getParticipationFromCookies } from "../../../../lib/participationCookies";
import {
  baseKeywords,
  runnerTypeKeywords,
  testKeywords,
} from "../../../../lib/seo";
import { cn } from "../../../../lib/utils";
import { getTestResult } from "./actions";
import ResultPageClient from "./ResultPageClient";

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

  const resultPageKeywords = [
    ...baseKeywords,
    ...runnerTypeKeywords,
    ...testKeywords,
    result.typeInfo.name,
    "운동결과",
    "나의 러닝 스타일",
  ];

  const ogImageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/og-image/${id}`;

  return {
    title: `나는 ${result.typeInfo.name}!`,
    description: `${result.typeInfo.description}`,
    keywords: [...new Set(resultPageKeywords)],
    openGraph: {
      title: `나는 ${result.typeInfo.name}!`,
      description: result.typeInfo.description,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/result/${id}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${result.typeInfo.name} - RunVibe 러닝 취향 분석 결과`,
        },
      ],
      siteName: "RunVibe",
    },
    alternates: {
      canonical: `/result/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `나는 ${result.typeInfo.name}!`,
      description: result.typeInfo.description,
      images: [ogImageUrl],
    },
    other: {
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:image:type": "image/png",
    },
  };
}
export default async function ResultPage({ params }: IResultPageProps) {
  const { id } = await params;
  const result = await getTestResult(id);

  if (!result) {
    notFound();
  }

  const cookieResultId = await getParticipationFromCookies();
  const isOwnResult = cookieResultId === result.id;

  const scoreData = getScoreData(result);
  const maxScore = Math.max(...scoreData.map((s) => s.score));
  const bgColorClass = getTypeBackgroundColor(result.runnerType);

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
        <ResultPageClient result={result} isOwnResult={isOwnResult} />
        {isOwnResult && (
          <footer className='text-center mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl'>
            <p className='text-sm text-gray-500 leading-relaxed'>
              친구들도 자신의 러닝 타입이 궁금하지 않을까요? 🤔
              <br />
              <span className='font-medium text-gray-600'>
                결과를 공유해서 함께 테스트해보세요!
              </span>
            </p>
          </footer>
        )}
      </div>
    </main>
  );
}
