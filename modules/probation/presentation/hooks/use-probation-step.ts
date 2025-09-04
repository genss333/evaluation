import { produce } from "immer";
import { StateCreator } from "zustand";
import { ProbationStep } from "../../data/models/probation-model";

export interface ProbationStepState {
  step: ProbationStep | null;
  setStep: (steps: ProbationStep[]) => void;
}

export const createProbationSlice: StateCreator<ProbationStepState> = (
  set
) => ({
  step: null,
  setStep(steps) {
    set(produce<ProbationStepState>((state) => {}));
  },
});
