import * as model from "@/modules/probation/data/models/probation-model";

interface MSSProbtionSchema {
  resultProbation: "pass" | "fail";
}

export interface SubFormRef {
  submit: () => void;
}

export type KPISchema = {
  kpis: {
    kpiMemo: string;
    kpiScore: number | string;
  }[];
  kpiSums?: {
    field: {
      key: String;
      value: number | string;
    };
  }[];
};

export type CompedencySchema = {
  comps: {
    compScore: number | string;
    compMemo: string;
  }[];
};

export type ProbationFormField = {
  [k: string]: string | model.ProbationFieldValue;
} & MSSProbtionSchema;
