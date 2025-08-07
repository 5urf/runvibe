import { TestResult } from "@prisma/client";

export type RunnerType =
  | "jogger"
  | "speedster"
  | "endurance"
  | "explorer"
  | "social"
  | "analyzer";

export interface IRunnerTypeScores {
  jogger: number;
  speedster: number;
  endurance: number;
  explorer: number;
  social: number;
  analyzer: number;
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
