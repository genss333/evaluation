import { NextResponse } from "next/server";
import * as model from "../../data/models/probation-kpi-model";
import { IKpiService } from "../../data/services/kpi-service";

export interface IKpiRepository<T> {
  call: () => Promise<T>;
}

export class KpiRepository implements IKpiRepository<model.ProbationKpi> {
  constructor(private readonly service: IKpiService<NextResponse>) {}
  async call(): Promise<model.ProbationKpi> {
    try {
      const response = await this.service.call();
      const data: model.ProbationKpi = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
