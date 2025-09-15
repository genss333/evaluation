import { produce } from "immer";
import { StateCreator } from "zustand";

export interface HrRollbackState {
  isHrRollback: boolean;
}

export interface HrRollbackActionState {
  setHrRollback: (value: boolean) => void;
}

export type CreateHrRollbackState = HrRollbackState & HrRollbackActionState;

export const CreateHrRollbackSlice: StateCreator<CreateHrRollbackState> = (
  set
) => ({
  isHrRollback: false,
  setHrRollback: (value) => {
    set(
      produce<CreateHrRollbackState>((state) => {
        state.isHrRollback = value;
      })
    );
  },
});
