import { NextResponse } from "next/server";
import { getStats } from "../../../../lib/stats";

export async function GET() {
  try {
    const statsData = await getStats();
    return NextResponse.json(statsData);
  } catch (error) {
    console.error("통계 API 오류:", error);
    return new NextResponse("통계를 불러올 수 없습니다.", {
      status: 500,
    });
  }
}
