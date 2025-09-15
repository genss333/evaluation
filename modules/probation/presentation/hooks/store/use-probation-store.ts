import { create } from "zustand";
import {
  CreateHrRollbackSlice,
  CreateHrRollbackState,
} from "../slices/create-hr-rollback";
import {
  CreateSelctEmployee,
  CreateSelctEmployeeSlice,
} from "../slices/select-employee";

type ProbationStore = CreateSelctEmployee & CreateHrRollbackState;

const useProbationStore = create<ProbationStore>()((...a) => ({
  ...CreateSelctEmployeeSlice(...a),
  ...CreateHrRollbackSlice(...a),
}));

export const useProbationProps = () => ({
  employees: useProbationStore((state) => state.employees),
  currentEmp: useProbationStore((state) => state.currentEmp),
  selectEmp: useProbationStore((state) => state.selectEmp),
  setEmployees: useProbationStore((state) => state.setEmployees),
  isHrRollback: useProbationStore((state) => state.isHrRollback),
  setHrRollback: useProbationStore((state) => state.setHrRollback),
});
