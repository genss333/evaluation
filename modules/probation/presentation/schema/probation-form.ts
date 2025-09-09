import * as model from "@/modules/probation/data/models/probation-model";

interface MSSProbtionSchema {
  resultProbation: "pass" | "fail";
}

export type KPISchema = {
  kpis: {
    kpiMemo: string;
    kpiScore: number | string;
  }[];
};

export interface CompetencySchema {
  comScore: number;
  comMemo: string;
}

export type ProbationFormField = {
  [k: string]: string | model.ProbationFieldValue;
} & MSSProbtionSchema;
