import { create } from "zustand";
import {
  CreateSelctEmployeeSlice,
  SelectEmployeeState,
} from "./slices/select-employee";

type ProbationStore = SelectEmployeeState;

const useProbationStore = create<ProbationStore>()((...a) => ({
  ...CreateSelctEmployeeSlice(...a),
}));

export const useProbationProps = () => ({
  employees: useProbationStore((state) => state.employees),
  currentEmp: useProbationStore((state) => state.currentEmp),
  selectEmp: useProbationStore((state) => state.selectEmp),
  setEmployees: useProbationStore((state) => state.setEmployees),
});
