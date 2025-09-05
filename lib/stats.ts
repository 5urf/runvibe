"use server";

import { IStatsData } from "@/types/stats";
import { prisma } from "./prisma";

// 통계 데이터 조회 - 통계 페이지, 랜딩 페이지에서 재사용
export async function getStats(): Promise<IStatsData> {
  try {
    const totalParticipants = await prisma.testResult.count();

    const typeDistribution = await prisma.testResult.groupBy({
      by: ["runnerType"],
      _count: { runnerType: true },
    });

    const typeStats = typeDistribution
      .map((item) => ({
        type: item.runnerType,
        count: item._count.runnerType,
        percentage:
          totalParticipants > 0
            ? Math.round((item._count.runnerType / totalParticipants) * 100)
            : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage);

    const podium = typeStats.slice(0, 3).map((item, index) => ({
      rank: index + 1,
      ...item,
    }));

    return {
      totalParticipants,
      podium,
      allTypes: typeStats,
    };
  } catch (error) {
    console.error("통계 조회 오류:", error);
    return {
      totalParticipants: 0,
      podium: [],
      allTypes: [],
    };
  }
}
