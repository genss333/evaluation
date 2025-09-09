import { create } from "zustand";
import {
  CreateSelctEmployee,
  CreateSelctEmployeeSlice,
} from "./slices/select-employee";

type ProbationStore = CreateSelctEmployee;

const useProbationStore = create<ProbationStore>()((...a) => ({
  ...CreateSelctEmployeeSlice(...a),
}));

export const useProbationProps = () => ({
  employees: useProbationStore((state) => state.employees),
  currentEmp: useProbationStore((state) => state.currentEmp),
  selectEmp: useProbationStore((state) => state.selectEmp),
  setEmployees: useProbationStore((state) => state.setEmployees),
  isSelectedEmp: useProbationStore((state) => state.isSelectedEmp),
  setSelectedEmp: useProbationStore((state) => state.setSelectedEmp),
});
