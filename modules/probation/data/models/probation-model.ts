export interface ProbationFieldValue {
  id: number;
  title: string;
}

export interface ProbationField {
  key: string;
  title: string;
  suffixText?: string;
  selctedValue?: ProbationFieldValue;
  values: ProbationFieldValue[];
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
  titles: ProbationField[];
  fields: ProbationField[];
  steps: ProbationStep[];
}
