import { questions } from "@/data/questions";
import { IRunnerTypeScores, RunnerType } from "@/types/test";

export function calculateRunnerType(answers: string[]): RunnerType {
  const totalScores: IRunnerTypeScores = {
    jogger: 0,
    speedster: 0,
    endurance: 0,
    explorer: 0,
    social: 0,
    analyzer: 0,
  };

  // 각 답변의 점수 합산
  answers.forEach((answerId, questionIndex) => {
    const question = questions[questionIndex];
    const selectedOption = question.options.find(
      (option) => option.id === answerId
    );

    if (selectedOption) {
      Object.keys(totalScores).forEach((type) => {
        totalScores[type as RunnerType] +=
          selectedOption.scores[type as RunnerType];
      });
    }
  });

  // 최고 점수 타입 찾기
  const maxScore = Math.max(...Object.values(totalScores));
  const topTypes = Object.entries(totalScores)
    .filter(([, score]) => score === maxScore)
    .map(([type]) => type as RunnerType);

  // 동점이면 첫 번째 타입 반환
  return topTypes[0];
}
