"use server";

import { questions } from "@/data/questions";
import { calculateRunnerType, calculateScores } from "@/utils/calculateScore";
import { revalidatePath } from "next/cache";
import {
  clearParticipationCookie,
  setParticipationCookie,
} from "../../../lib/participationCookies";
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
        slowScore: scores.slow,
        marathonerScore: scores.marathoner,
        trailScore: scores.trail,
        crewScore: scores.crew,
        styleScore: scores.style,
        raceScore: scores.race,
      },
    });

    await setParticipationCookie(result.id);

    // 관련 페이지들 캐시 갱신
    revalidatePath("/stats");
    revalidatePath("/"); // 랜딩페이지 참여자 수

    return result.id;
  } catch (error) {
    console.error("테스트 결과 저장 오류:", error);
    throw new Error("결과 저장 중 오류가 발생했습니다.");
  }
}

// 재참여를 위한 기존 결과 삭제 + 쿠키 초기화
export async function retakeTest(existingResultId: string): Promise<void> {
  try {
    await prisma.testResult.delete({
      where: { id: existingResultId },
    });

    await clearParticipationCookie();

    revalidatePath("/stats");
    revalidatePath("/");
    revalidatePath("/test");
  } catch (error) {
    console.error("재참여 처리 오류:", error);

    await clearParticipationCookie();

    throw new Error("재참여 처리 중 오류가 발생했습니다.");
  }
}

export async function validateParticipation(
  resultId: string
): Promise<boolean> {
  try {
    const result = await prisma.testResult.findUnique({
      where: { id: resultId },
      select: { id: true },
    });

    return !!result;
  } catch (error) {
    console.error("참여 정보 검증 오류:", error);
    return false;
  }
}
