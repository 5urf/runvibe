import Link from "next/link";
import { notFound } from "next/navigation";
import { getTestResult } from "./actions";

interface ResultPageProps {
  params: Promise<{ id: string }>;
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { id } = await params;
  const result = await getTestResult(id);

  if (!result) {
    notFound();
  }

  return (
    <div className='min-h-screen p-8'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6'>🎉 테스트 결과</h1>

        <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
          <div className='text-center mb-6'>
            <div className='text-6xl mb-4'>{result.typeInfo.emoji}</div>
            <h2 className='text-2xl font-bold text-gray-800 mb-2'>
              나는 {result.typeInfo.name}!
            </h2>
            <p className='text-gray-600'>{result.typeInfo.description}</p>
          </div>

          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <strong>결과 ID:</strong> {result.id}
            </div>
            <div>
              <strong>생성일:</strong>{" "}
              {new Date(result.createdAt).toLocaleString()}
            </div>
            <div>
              <strong>슬로우:</strong> {result.slowScore}점 🌱
            </div>
            <div>
              <strong>마라토너:</strong> {result.marathonerScore}점 🏅
            </div>
            <div>
              <strong>트레일:</strong> {result.trailScore}점 🏔️
            </div>
            <div>
              <strong>크루:</strong> {result.crewScore}점 👥
            </div>
            <div>
              <strong>패션:</strong> {result.styleScore}점 👟
            </div>
            <div>
              <strong>레이스:</strong> {result.raceScore}점 🥇
            </div>
          </div>
        </div>

        <div className='text-center space-x-4'>
          <Link
            href='/test'
            className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600'
          >
            다시 테스트하기
          </Link>
          <Link
            href='/'
            className='bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600'
          >
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
