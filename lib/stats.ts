"use server";

import { IStatsData } from "@/types/test";
import { prisma } from "./prisma";

// 통계 데이터 조회 - 통계 페이지, 랜딩 페이지에서 재사용
export async function getStats(): Promise<IStatsData> {
  try {
    const totalParticipants = await prisma.testResult.count();

    // 각 타입별 개수를 병렬로 조회
    const [
      joggerCount,
      speedsterCount,
      enduranceCount,
      explorerCount,
      socialCount,
      analyzerCount,
    ] = await Promise.all([
      prisma.testResult.count({ where: { runnerType: "jogger" } }),
      prisma.testResult.count({ where: { runnerType: "speedster" } }),
      prisma.testResult.count({ where: { runnerType: "endurance" } }),
      prisma.testResult.count({ where: { runnerType: "explorer" } }),
      prisma.testResult.count({ where: { runnerType: "social" } }),
      prisma.testResult.count({ where: { runnerType: "analyzer" } }),
    ]);

    // 타입 정보와 개수를 매핑
    const runnerTypeData = [
      {
        type: "jogger",
        count: joggerCount,
        name: "조깅 러너",
        emoji: "🌱",
        color: "bg-green-500",
      },
      {
        type: "speedster",
        count: speedsterCount,
        name: "스피드 러너",
        emoji: "⚡",
        color: "bg-red-500",
      },
      {
        type: "endurance",
        count: enduranceCount,
        name: "지구력 러너",
        emoji: "🎯",
        color: "bg-blue-500",
      },
      {
        type: "explorer",
        count: explorerCount,
        name: "모험 러너",
        emoji: "🏔️",
        color: "bg-purple-500",
      },
      {
        type: "social",
        count: socialCount,
        name: "소셜 러너",
        emoji: "👥",
        color: "bg-yellow-500",
      },
      {
        type: "analyzer",
        count: analyzerCount,
        name: "데이터 러너",
        emoji: "📊",
        color: "bg-indigo-500",
      },
    ];

    // 퍼센트 계산
    const typeDistribution = runnerTypeData.map((runner) => ({
      ...runner,
      percentage:
        totalParticipants > 0
          ? Math.round((runner.count / totalParticipants) * 100)
          : 0,
    }));

    return {
      totalParticipants,
      typeDistribution,
    };
  } catch (error) {
    console.error("통계 조회 오류:", error);
    return {
      totalParticipants: 0,
      typeDistribution: [],
    };
  }
}
