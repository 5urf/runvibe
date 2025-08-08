import { TestResult } from "@prisma/client";

export type RunnerType =
  | "slow" // 슬로우 러너
  | "marathoner" // 마라토너
  | "trail" // 트레일 러너
  | "crew" // 크루 러너
  | "style" // 패션 러너
  | "race"; // 레이스 헌터

export interface IRunnerTypeScores {
  slow: number;
  marathoner: number;
  trail: number;
  crew: number;
  style: number;
  race: number;
}

export interface IOption {
  id: string;
  text: string;
  emoji?: string;
  scores: IRunnerTypeScores;
}

export interface IQuestion {
  id: number;
  title: string;
  options: IOption[];
}

export interface IRunnerTypeInfo {
  name: string;
  emoji: string;
  description: string;
  characteristics: string[];
  recommendations: string[];
}

// 결과 페이지용
export interface ITestResultWithTypeInfo extends TestResult {
  typeInfo: IRunnerTypeInfo;
}

// 통계용 타입
export interface IStatsData {
  totalParticipants: number;
  typeDistribution: Array<{
    type: string;
    name: string;
    emoji: string;
    color: string;
    count: number;
    percentage: number;
  }>;
}
