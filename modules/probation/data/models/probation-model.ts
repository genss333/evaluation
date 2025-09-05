export interface ProbationTitleValue {
  id: number;
  title: string;
}

export interface ProbationTitle {
  title: string;
  value: ProbationTitleValue[];
}

export interface ProbationGroup {
  timeAttandance: number;
  kpi: number;
  competency: number;
  total: number;
}

export interface ProbationGrade {
  grade: string;
  period: string;
}

export interface ProbationStep {
  title?: string;
  desc?: string;
  status: "1" | "P" | "LP" | "R" | "A";
  dateTime?: Date | null;
}

export interface ProbationModel {
  titles: Partial<ProbationTitle[]>;
  count: number;
  code: string;
  empName: string;
  startDate: Date;
  startWork: Date;
  position: string;
  Probation: Date;
  empLevel: string;
  workAge: number;
  group: Partial<ProbationGroup>;
  grade: Partial<ProbationGrade>;
  steps: Partial<ProbationStep[]>;
  multiform: boolean;
}
