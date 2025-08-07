"use server";

import { questions } from "@/data/questions";
import { calculateRunnerType, calculateScores } from "@/utils/calculateScore";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../lib/prisma";

export async function saveTestResult(answers: string[]): Promise<string> {
  try {
    if (answers.length !== questions.length) {
      throw new Error("모든 질문에 답변해주세요.");
    }

    // 점수 계산
    const scores = calculateScores(answers);
    const resultType = calculateRunnerType(answers);

    const result = await prisma.testResult.create({
      data: {
        runnerType: resultType,
        answers: JSON.stringify(answers),
        joggerScore: scores.jogger,
        speedsterScore: scores.speedster,
        enduranceScore: scores.endurance,
        explorerScore: scores.explorer,
        socialScore: scores.social,
        analyzerScore: scores.analyzer,
      },
    });

    // 관련 페이지들 캐시 갱신
    revalidatePath("/stats");
    revalidatePath("/"); // 랜딩페이지 참여자 수

    return result.id;
  } catch (error) {
    console.error("테스트 결과 저장 오류:", error);
    throw new Error("결과 저장 중 오류가 발생했습니다.");
  }
}
