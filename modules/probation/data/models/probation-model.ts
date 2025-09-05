export interface ProbationTitleValue {
  id: number;
  title: string;
}

export interface ProbationTitle {
  title: string;
  values: ProbationTitleValue[];
  disable: boolean;
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

export interface YearProbation {
  id: number;
  title: string;
}

export interface ProbationModel {
  titles: ProbationTitle[];
  count: number;
  code: string;
  empName: string;
  startDate: Date;
  startWork: Date;
  position: string;
  years: YearProbation[];
  month: YearProbation[];
  empLevel: string;
  workAge: number;
  group: ProbationGroup;
  grade: ProbationGrade;
  steps: ProbationStep[];
  multiform: boolean;
}
