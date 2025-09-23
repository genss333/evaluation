import { ProbationStep } from "../entities/probation";

export class GetProbationStep {
  call(data: Array<ProbationStep[] & { formId: number }>, formId: number) {
    if (!data) {
      throw new Error("data is error");
    }

    const result: ProbationStep[] = data
      .filter((item) => item.formId === formId)
      .flatMap((item) => item);

    return result;
  }
}
