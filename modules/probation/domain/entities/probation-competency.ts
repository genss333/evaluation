import { Kpi } from "./probation-kpi";

export interface Competency
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

export type CompetencyKey = keyof Competency;
