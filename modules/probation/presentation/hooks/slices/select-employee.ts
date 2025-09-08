import * as model from "@/modules/probation/data/models/probation-model";
import { produce } from "immer";
import { StateCreator } from "zustand";

export interface SelectEmployeeState {
  employees: model.Employee[] | [];
  currentEmp: model.Employee | null;
  isSelectedEmp: boolean;
  setSelectedEmp: () => void;
  selectEmp: (emp: model.Employee) => void;
  setEmployees: (list: model.Employee[]) => void;
}

export const CreateSelctEmployeeSlice: StateCreator<SelectEmployeeState> = (
  set
) => ({
  employees: [],
  currentEmp: null,
  isSelectedEmp: false,
  setSelectedEmp: () => {
    set(
      produce<SelectEmployeeState>((state) => {
        state.isSelectedEmp = true;
      })
    );
  },
  selectEmp: (emp) => {
    set(
      produce<SelectEmployeeState>((state) => {
        state.currentEmp = emp;
      })
    );
  },
  setEmployees: (list) => {
    set(
      produce<SelectEmployeeState>((state) => {
        state.employees = list;
      })
    );
  },
});
