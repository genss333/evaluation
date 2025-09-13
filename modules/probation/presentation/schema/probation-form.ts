import * as model from "@/modules/probation/data/models/probation-model";
import z from "zod";
import { CompetencyModel } from "../../data/models/probation-competency-model";
import { Kpi } from "../../data/models/probation-kpi-model";

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
  comps: CompetencyModel[];
  compsSums?: {
    field: {
      key: string;
      value: number | string;
    };
  }[];
};

export const devplanModelSchema = z.object({
  id: z.number().int(),
  plan: z.string().min(1),
  priority: z.number().int(),
  dateTime: z.date().nullable().optional(),
  remark: z.string().min(1),
});

export const devplanSchema = z.object({
  plans: z.array(devplanModelSchema),
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

export type MoreProbationSchema = z.infer<typeof moreProbationZodSchema>;

export type ProbationFormField = {
  [k: string]: string | model.ProbationFieldValue;
} & {
  resultProbation: "pass" | "fail";
};
