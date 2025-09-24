export interface SubmitEvalForm {
  status: string;
  kpis: Kpi[];
  competency_scores: CompetencyScore[];
  time_attendance: TimeAttendance;
  development_plan: DevelopmentPlan[];
  additional: Additional;
}

export interface Additional {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
}

export interface CompetencyScore {
  comp_id: number;
  score: number;
  note: string;
}

export interface DevelopmentPlan {
  idx: number;
  content: string;
  priority: string;
  timing: Date;
  remarks: string;
}

export interface Kpi {
  idx: number;
  code: string;
  title: string;
  max_score: number;
  weight: number;
  expected_score: number;
  score: number;
  note: string;
  measure: string;
  criteria: string;
}

export interface TimeAttendance {
  full_score: number;
  score: number;
}
