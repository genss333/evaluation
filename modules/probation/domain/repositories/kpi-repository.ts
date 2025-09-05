import { NextResponse } from "next/server";
import * as model from "../../data/models/probation-kpi-model";
import { IKpiService } from "../../data/services/kpi-service";

export interface IKpiRepository<T> {
  call: () => Promise<T>;
}

export class KpiRepository implements IKpiRepository<model.Kpi[]> {
  constructor(private readonly service: IKpiService<NextResponse>) {}
  async call(): Promise<model.Kpi[]> {
    try {
      const response = await this.service.call();
      const data: model.Kpi[] = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
