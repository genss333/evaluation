import { Kpi } from "./probation-kpi-model";

export interface CompetencyModel
  extends Pick<
    Kpi,
    | "id"
    | "runNumber"
    | "title"
    | "score"
    | "weight"
    | "total"
    | "targetScore"
    | "scoreList"
    | "sumScore"
    | "memo"
  > {
  sum?: number;
}

export type CompetencyKey = keyof CompetencyModel;
