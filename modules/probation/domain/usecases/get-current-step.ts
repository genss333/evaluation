import { ProbationStep } from "../../data/models/probation-model";

export class GetCurrentStep {
  static call(steps: ProbationStep[]) {
    if (!steps) {
      return null;
    }

    steps.forEach((item, index) => {
      if (!item.dateTime && ["1", "P", "LP"].includes(item.status)) {
        return steps[index + 1];
      }
      return item;
    });
  }
}
