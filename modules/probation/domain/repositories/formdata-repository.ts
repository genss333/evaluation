import { NextResponse } from "next/server";
import { IFormDataService } from "../../data/services/form-data-service";
import { EvalFormData } from "../entities/eval-form-data";

export interface IFormDataRepository<T> {
  call(formId: number): Promise<T>;
}

export class FormDataRepository implements IFormDataRepository<EvalFormData> {
  constructor(private readonly service: IFormDataService<NextResponse>) {}
  async call(formId: number): Promise<EvalFormData> {
    try {
      const response = await this.service.call(formId);
      const data: EvalFormData = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
}
