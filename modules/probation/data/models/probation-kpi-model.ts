export interface Kpi {
  id: number;
  runNumber: number;
  code: string;
  title: string;
  total: number;
  targetScore: number;
  score: number | null;
  memo: string | null;
  how: string;
}

export type KpiKey = keyof Kpi;
