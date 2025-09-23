import * as model from "@/modules/probation/domain/entities/probation";
import z from "zod";

import { Competency, Kpi } from "../../domain/entities/eval-form-data";

export interface SubFormRef {
  submit: () => void;
}

export type KPISchema = {
  kpis: Kpi[];
  kpiSums?: {
    field: {
      key: string;
      value: number | string;
    };
  }[];
};

export type CompedencySchema = {
  comps: Competency[];
  compsSums?: {
    field: {
      key: string;
      value: number | string;
    };
  }[];
};

export const DevplanSchema = z.object({
  id: z.number().int(),
  plan: z.string().min(1),
  priority: z.number().int(),
  dateTime: z.date().nullable().optional(),
  remark: z.string().min(1),
});

export const devplanSchema = z.object({
  plans: z.array(DevplanSchema),
});

export type DevplanSchema = z.infer<typeof devplanSchema>;

export const moreProbationZodSchema = z.record(
  z.string(),
  z.array(
    z
      .object({
        disable: z.boolean(),
      })
      .catchall(z.union([z.string().min(1), z.boolean()]))
  )
);

export type MoreProbationSchema = {
  mores: { key: string; value: string }[];
};

export type ProbationFormField = {
  [k: string]: string | model.ProbationFieldValue;
} & {
  resultProbation: string;
};
