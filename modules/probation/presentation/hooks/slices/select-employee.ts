import * as model from "@/modules/probation/data/models/probation-model";
import { produce } from "immer";
import { StateCreator } from "zustand";

interface SelectEmployeeState {
  employees: model.Employee[] | [];
  currentEmp: model.Employee | null;
  isSelectedEmp: boolean;
}
interface SelectEmployeeAction {
  setSelectedEmp: () => void;
  selectEmp: (emp: model.Employee) => void;
  setEmployees: (list: model.Employee[]) => void;
}

export type CreateSelctEmployee = SelectEmployeeState & SelectEmployeeAction;

export const CreateSelctEmployeeSlice: StateCreator<CreateSelctEmployee> = (
  set
) => ({
  employees: [],
  currentEmp: null,
  isSelectedEmp: false,
  setSelectedEmp: () => {
    set(
      produce<CreateSelctEmployee>((state) => {
        state.isSelectedEmp = true;
      })
    );
  },
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
