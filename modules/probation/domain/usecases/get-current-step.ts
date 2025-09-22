import { ProbationStep } from "../entities/probation";

export class GetCurrentStep {
  call(steps: ProbationStep[]) {
    if (!steps || steps.length === 0) {
      return null;
    }

    const index = steps
      ? steps.findIndex(
          (step) => !step.dateTime && ["1", "P", "LP"].includes(step.status)
        )
      : -1;

    return index;
  }
}
