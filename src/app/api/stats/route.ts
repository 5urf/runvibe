import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
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
        percentage: (item._count.runnerType / totalParticipants) * 100,
      }))
      .sort((a, b) => b.percentage - a.percentage);

    const podium = typeStats.slice(0, 3).map((item, index) => ({
      rank: index + 1,
      ...item,
    }));

    return NextResponse.json({
      totalParticipants,
      podium,
      allTypes: typeStats,
    });
  } catch (error) {
    console.error("통계 API 오류:", error);
    return new NextResponse("통계를 불러올 수 없습니다.", {
      status: 500,
    });
  }
}
