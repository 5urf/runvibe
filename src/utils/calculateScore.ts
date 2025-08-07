import { questions } from "@/data/questions";
import { IRunnerTypeScores, RunnerType } from "@/types/test";

export function calculateScores(answers: string[]): IRunnerTypeScores {
  const totalScores: IRunnerTypeScores = {
    jogger: 0,
    speedster: 0,
    endurance: 0,
    explorer: 0,
    social: 0,
    analyzer: 0,
  };

  answers.forEach((answerId, questionIndex) => {
    const question = questions[questionIndex];
    const selectedOption = question.options.find(
      (option) => option.id === answerId
    );

    if (selectedOption) {
      // Object.keys로 동적 처리 - 타입 추가시 자동 반영
      Object.keys(totalScores).forEach((type) => {
        totalScores[type as RunnerType] +=
          selectedOption.scores[type as RunnerType];
      });
    }
  });

  return totalScores;
}

// 러너 타입 결정 함수
export function calculateRunnerType(answers: string[]): RunnerType {
  const scores = calculateScores(answers);

  // 최고 점수 타입 찾기
  const maxScore = Math.max(...Object.values(scores));
  const topTypes = Object.entries(scores)
    .filter(([, score]) => score === maxScore)
    .map(([type]) => type as RunnerType);

  // 동점이면 첫 번째 타입 반환
  return topTypes[0];
}
