interface Score {
  score: number | null;
  disable: boolean;
}

export interface SumScore {
  id: number;
  key: string;
  title: string;
  value: number | string;
}

export interface Kpi {
  id: number;
  runNumber: number;
  code: string;
  title: string;
  total: number;
  targetScore: number;
  scoreList?: {
    id: number;
    title: string;
    value: number;
  }[];
  standard: string;
  score: Score;
  memo?: string | null;
  how: string;
}

export type KpiKey = keyof Kpi;
