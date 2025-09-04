import { produce } from "immer";
import { StateCreator } from "zustand";
import { ProbationStep } from "../../data/models/probation-model";
import { GetCurrentStep } from "../../domain/usecases/get-current-step";

export interface ProbationStepState {
  step: ProbationStep | null;
  setStep: (steps: ProbationStep[]) => void;
}

export const createProbationSlice: StateCreator<ProbationStepState> = (
  set
) => ({
  step: null,
  setStep(steps) {
    set(
      produce<ProbationStepState>((state) => {
        const usecase = new GetCurrentStep();
        state.step = usecase.call(steps);
      })
    );
  },
});
