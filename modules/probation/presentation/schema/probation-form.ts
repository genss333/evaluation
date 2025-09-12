import * as model from "@/modules/probation/data/models/probation-model";
import { CompetencyModel } from "../../data/models/probation-competency-model";
import { DevplanModel } from "../../data/models/probation-devplan-model";
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
  comps: CompetencyModel[];
  compsSums?: {
    field: {
      key: String;
      value: number | string;
    };
  }[];
};

export type DevplanSchema = {
  plans: DevplanModel[];
};

export type MoreProbationSchema = {
  [k: string]: string;
};

export type ProbationFormField = {
  [k: string]: string | model.ProbationFieldValue;
} & MSSProbtionSchema;
