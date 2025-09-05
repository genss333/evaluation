import { NextResponse } from "next/server";
import * as model from "../../data/models/probation-kpi-model";
import { ProbationTableModel } from "../../data/models/probation-table-model";
import { IKpiService } from "../../data/services/kpi-service";

export interface IKpiRepository<T> {
  call: () => Promise<T>;
}

export class KpiRepository
  implements IKpiRepository<ProbationTableModel<model.Kpi>>
{
  constructor(private readonly service: IKpiService<NextResponse>) {}
  async call(): Promise<ProbationTableModel<model.Kpi>> {
    try {
      const response = await this.service.call();
      const data: ProbationTableModel<model.Kpi> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
