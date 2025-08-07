"use server";

import { runnerTypeInfo } from "@/data/runnerTypeInfo";
import { ITestResultWithTypeInfo, RunnerType } from "@/types/test";
import { prisma } from "../../../../lib/prisma";

export async function getTestResult(
  id: string
): Promise<ITestResultWithTypeInfo | null> {
  try {
    const result = await prisma.testResult.findUnique({
      where: { id },
    });

    if (!result) {
      return null;
    }

    const typeInfo = runnerTypeInfo[result.runnerType as RunnerType];

    return {
      ...result,
      typeInfo, // 추가 정보만 덧붙임
    };
  } catch (error) {
    console.error("테스트 결과 조회 오류:", error);
    return null;
  }
}
