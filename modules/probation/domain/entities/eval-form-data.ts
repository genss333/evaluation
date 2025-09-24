export interface EvalFormData {
  assignment_id: number;
  status: number;
  due_date: Date;
  kpis: Kpi[];
  competencies: Competency[];
  time_attendance: TimeAttendance;
  development_plan: Devplan[];
  additional: Additional;
  summary: Summary;
}

export interface Additional {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
}

export interface Competency {
  comp_id: number;
  idx: number;
  title: string;
  max_score: number;
  weight: number;
  full_total: number;
  expected_score: number;
  score: number;
  note: string;
}

export interface Kpi {
  id: number;
  assignment_id: number;
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
  unit?: string;
}

export interface Summary {
  form_id: number;
  kpi_weight: number;
  kpi_pct: number;
  comp_weight: number;
  comp_pct: number;
  ta_weight: number;
  ta_pct: number;
  total_pct: number;
  grade: string;
  grade_min: number;
  grade_max: number;
}

export interface TimeAttendance {
  full_score: number;
  score: number;
}

export interface Devplan {
  idx: number;
  content: string;
  priority: string;
  timing: Date | null | undefined;
  remarks: string;
}
