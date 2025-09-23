import { produce } from "immer";
import { StateCreator } from "zustand";

export interface SelectFormState {
  formId: number;
}

export interface SelectFormActionState {
  setFormId: (value: number) => void;
}

export type CreateSelectForm = SelectFormState & SelectFormActionState;

export const createSelectFormSlice: StateCreator<CreateSelectForm> = (set) => ({
  formId: 0,
  setFormId: (id) => {
    set(
      produce<CreateSelectForm>((state) => {
        state.formId = id;
      })
    );
  },
});
