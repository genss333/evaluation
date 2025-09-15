interface Score {
  score: number | null;
  disable: boolean;
}

export interface SumScore {
  id: number;
  key: string;
  title: string;
  value: number | string;
  disable: boolean;
}

export interface Kpi {
  id: number;
  runNumber: number;
  code: string;
  title: string;
  total: number;
  weight: number;
  targetScore: number;
  scoreList?: {
    id: number;
    title: string;
    value: number;
  }[];
  standard: string;
  score: Score;
  sumScore?: number | string;
  memo?: {
    value: string | null;
    disable: boolean;
  };
  how: string;
}

export type KpiKey = keyof Kpi;
