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
