"use server";

import { IStatsData } from "@/types/test";
import { prisma } from "./prisma";

// 통계 데이터 조회 - 통계 페이지, 랜딩 페이지에서 재사용
export async function getStats(): Promise<IStatsData> {
  try {
    const totalParticipants = await prisma.testResult.count();

    // 각 타입별 개수를 병렬로 조회
    const [
      slowCount,
      marathonerCount,
      trailCount,
      crewCount,
      styleCount,
      raceCount,
    ] = await Promise.all([
      prisma.testResult.count({ where: { runnerType: "slow" } }),
      prisma.testResult.count({ where: { runnerType: "marathoner" } }),
      prisma.testResult.count({ where: { runnerType: "trail" } }),
      prisma.testResult.count({ where: { runnerType: "crew" } }),
      prisma.testResult.count({ where: { runnerType: "style" } }),
      prisma.testResult.count({ where: { runnerType: "race" } }),
    ]);

    // 타입 정보와 개수를 매핑
    const runnerTypeData = [
      {
        type: "slow",
        count: slowCount,
        name: "슬로우 러너",
        emoji: "🌱",
        color: "bg-runner-slow",
      },
      {
        type: "marathoner",
        count: marathonerCount,
        name: "마라토너",
        emoji: "🏅",
        color: "bg-runner-marathoner",
      },
      {
        type: "trail",
        count: trailCount,
        name: "트레일 러너",
        emoji: "🏔️",
        color: "bg-runner-trail",
      },
      {
        type: "crew",
        count: crewCount,
        name: "크루 러너",
        emoji: "👥",
        color: "bg-runner-crew",
      },
      {
        type: "style",
        count: styleCount,
        name: "패션 러너",
        emoji: "👟",
        color: "bg-runner-style",
      },
      {
        type: "race",
        count: raceCount,
        name: "레이스 헌터",
        emoji: "🥇",
        color: "bg-runner-race",
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
