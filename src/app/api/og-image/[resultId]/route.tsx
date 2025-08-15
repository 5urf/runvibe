import { runnerTypeInfo } from "@/data/runnerTypeInfo";
import { RunnerType } from "@/types/test";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ resultId: string }> }
) {
  try {
    const { resultId } = await params;

    const result = await prisma.testResult.findUnique({
      where: { id: resultId },
      select: {
        runnerType: true,
      },
    });

    if (!result) {
      return new Response("Result not found", { status: 404 });
    }

    const typeInfo = runnerTypeInfo[result.runnerType as RunnerType];
    if (!typeInfo) {
      return new Response("Runner type not found", { status: 404 });
    }

    // 러너 타입별 배경색
    const getBackgroundGradient = (runnerType: RunnerType) => {
      switch (runnerType) {
        case "slow":
          return "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)";
        case "marathoner":
          return "linear-gradient(135deg, #fa709a 0%, #fee140 100%)";
        case "trail":
          return "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)";
        case "crew":
          return "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)";
        case "style":
          return "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)";
        case "race":
          return "linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%)";
        default:
          return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      }
    };

    // OG 이미지 생성
    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: getBackgroundGradient(result.runnerType as RunnerType),
            fontFamily: "system-ui, -apple-system, sans-serif",
            position: "relative",
          }}
        >
          {/* 메인 컨텐츠 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "60px",
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "32px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            {/* 러너 이모지 */}
            <div
              style={{
                display: "flex",
                fontSize: "120px",
                marginBottom: "20px",
              }}
            >
              {typeInfo.emoji}
            </div>

            {/* 메인 타이틀 */}
            <div
              style={{
                display: "flex",
                fontSize: "54px",
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              나는 {typeInfo.name}!
            </div>

            {/* 설명 */}
            <div
              style={{
                display: "flex",
                fontSize: "28px",
                color: "#6b7280",
                textAlign: "center",
                maxWidth: "800px",
                lineHeight: 1.4,
              }}
            >
              {typeInfo.description}
            </div>
          </div>

          {/* 브랜드 로고/텍스트 (우하단) */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              right: "40px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(255, 255, 255, 0.9)",
              padding: "16px 24px",
              borderRadius: "20px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "24px",
              }}
            >
              🏃‍♂️
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "22px",
                fontWeight: "600",
                color: "#f97316",
              }}
            >
              RunVibe
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("OG Image generation failed:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
