export interface IRunnerTypeStats {
  type: string;
  count: number;
  percentage: number;
}

export interface IPodiumItem extends IRunnerTypeStats {
  rank: number;
}

export interface IStatsData {
  totalParticipants: number;
  podium: IPodiumItem[];
  allTypes: IRunnerTypeStats[];
}
