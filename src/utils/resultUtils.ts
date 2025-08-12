import { RunnerType } from "@/types/test";

// 타입별 컬러 매핑
export const typeColors = {
  slow: "bg-runner-slow",
  marathoner: "bg-runner-marathoner",
  trail: "bg-runner-trail",
  crew: "bg-runner-crew",
  style: "bg-runner-style",
  race: "bg-runner-race",
} as const;

// 점수 데이터 구성
export const getScoreData = (scores: {
  slowScore: number;
  marathonerScore: number;
  trailScore: number;
  crewScore: number;
  styleScore: number;
  raceScore: number;
}) => [
  { key: "slow", label: "슬로우", emoji: "🌱", score: scores.slowScore },
  {
    key: "marathoner",
    label: "마라토너",
    emoji: "🏅",
    score: scores.marathonerScore,
  },
  { key: "trail", label: "트레일", emoji: "🏔️", score: scores.trailScore },
  { key: "crew", label: "크루", emoji: "👥", score: scores.crewScore },
  { key: "style", label: "패션", emoji: "👟", score: scores.styleScore },
  { key: "race", label: "레이스", emoji: "🥇", score: scores.raceScore },
];

// 배경 컬러 클래스 가져오기
export const getTypeBackgroundColor = (runnerType: string): string => {
  return typeColors[runnerType as RunnerType] || typeColors.slow;
};
