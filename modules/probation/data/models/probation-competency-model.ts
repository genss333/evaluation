import { Kpi } from "./probation-kpi-model";

export interface CompetencyModel
  extends Pick<
    Kpi,
    | "id"
    | "runNumber"
    | "title"
    | "score"
    | "total"
    | "targetScore"
    | "scoreList"
    | "memo"
  > {
  weight: number;
  sum: number;
}

export type CompetencyKey = keyof CompetencyModel;
