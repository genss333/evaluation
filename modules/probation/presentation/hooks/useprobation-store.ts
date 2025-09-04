import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createProbationSlice, ProbationStepState } from "./useprobation-step";

type ProbationStore = ProbationStepState;

const useProbationStore = create<ProbationStore>()(
  devtools(
    (...a) => ({
      ...createProbationSlice(...a),
    }),
    { name: "useProbationStore" }
  )
);

export const useProbationStoreProps = () => ({
  step: useProbationStore((state) => state.step),
  setStep: useProbationStore((state) => state.setStep),
});
