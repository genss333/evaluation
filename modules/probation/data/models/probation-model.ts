export interface ProbationTitleValue {
  id: number;
  title: string;
}

export interface ProbationTitle {
  title: string;
  values: ProbationTitleValue[];
  disable: boolean;
}

export interface ProbationStep {
  title?: string;
  desc?: string;
  status: "1" | "P" | "LP" | "R" | "A";
  dateTime?: Date | null;
}

export interface Employee {
  personCode: string;
  name: string;
  percent: number;
}

export interface ProbationModel {
  employee?: Employee[] | null;
  titles: ProbationTitle[];
  count: ProbationTitle;
  code: ProbationTitle;
  empName: ProbationTitle;
  startDate: ProbationTitle;
  startWork: ProbationTitle;
  position: ProbationTitle;
  years: ProbationTitle;
  month: ProbationTitle;
  empLevel: ProbationTitle;
  workAge: ProbationTitle;
  group: ProbationTitle[];
  totalScore: ProbationTitle;
  grade: ProbationTitle;
  gradePeriod: string;
  steps: ProbationStep[];
}
