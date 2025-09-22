import { NextResponse } from "next/server";
import { IKpiService } from "../../data/services/kpi-service";
import * as model from "../entities/probation-kpi";
import { ProbationTable } from "../entities/probation-table";

export interface IKpiRepository<T> {
  call: () => Promise<T>;
}

export class KpiRepository
  implements IKpiRepository<ProbationTable<model.Kpi>>
{
  constructor(private readonly service: IKpiService<NextResponse>) {}
  async call(): Promise<ProbationTable<model.Kpi>> {
    try {
      const response = await this.service.call();
      const data: ProbationTable<model.Kpi> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
