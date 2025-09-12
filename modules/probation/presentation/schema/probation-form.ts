import * as model from "@/modules/probation/data/models/probation-model";
import { Kpi } from "../../data/models/probation-kpi-model";

interface MSSProbtionSchema {
  resultProbation: "pass" | "fail";
}

export interface SubFormRef {
  submit: () => void;
}

export type KPISchema = {
  kpis: Kpi[];
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
  compsSums?: {
    field: {
      key: String;
      value: number | string;
    };
  }[];
};

export type DevplanSchema = {
  plans: {
    plan: string;
    priority: string;
    timing: string;
    remark: string;
  }[];
};

export type MoreProbationSchema = {
  [k: string]: string;
};

export type ProbationFormField = {
  [k: string]: string | model.ProbationFieldValue;
} & MSSProbtionSchema;
