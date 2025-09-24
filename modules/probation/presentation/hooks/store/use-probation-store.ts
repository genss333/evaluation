import { create } from "zustand";
import {
  CreateHrRollbackSlice,
  CreateHrRollbackState,
} from "../slices/create-hr-rollback";
import {
  CreateSelctEmployee,
  CreateSelctEmployeeSlice,
} from "../slices/select-employee";
import { CreateSelectForm, createSelectFormSlice } from "../slices/select-form";

type ProbationStore = CreateSelctEmployee &
  CreateHrRollbackState &
  CreateSelectForm;

const useProbationStore = create<ProbationStore>()((...a) => ({
  ...CreateSelctEmployeeSlice(...a),
  ...CreateHrRollbackSlice(...a),
  ...createSelectFormSlice(...a),
}));

export const useProbationProps = () => ({
  employees: useProbationStore((state) => state.employees),
  currentEmp: useProbationStore((state) => state.currentEmp),
  selectEmp: useProbationStore((state) => state.selectEmp),
  setEmployees: useProbationStore((state) => state.setEmployees),
  isHrRollback: useProbationStore((state) => state.isHrRollback),
  setHrRollback: useProbationStore((state) => state.setHrRollback),
  formId: useProbationStore((state) => state.formId),
  setFormId: useProbationStore((state) => state.setFormId),
});
