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

export interface ProbationKpi {
  title: string;
  desc: string;
  list: Kpi[];
}
