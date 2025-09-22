import * as model from "@/modules/probation/domain/entities/probation";
import { produce } from "immer";
import { StateCreator } from "zustand";

interface SelectEmployeeState {
  employees: model.Employee[] | [];
  currentEmp: model.Employee | null;
}
interface SelectEmployeeAction {
  selectEmp: (emp: model.Employee) => void;
  setEmployees: (list: model.Employee[]) => void;
}

export type CreateSelctEmployee = SelectEmployeeState & SelectEmployeeAction;

export const CreateSelctEmployeeSlice: StateCreator<CreateSelctEmployee> = (
  set
) => ({
  employees: [],
  currentEmp: null,
  selectEmp: (emp) => {
    set(
      produce<CreateSelctEmployee>((state) => {
        state.currentEmp = emp;
      })
    );
  },
  setEmployees: (list) => {
    set(
      produce<CreateSelctEmployee>((state) => {
        state.employees = list;
      })
    );
  },
});
