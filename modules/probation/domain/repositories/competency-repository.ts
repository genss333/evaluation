import { NextResponse } from "next/server";
import { CompetencyModel } from "../../data/models/probation-competency-model";
import { ProbationTableModel } from "../../data/models/probation-table-model";
import { ICompetencyService } from "../../data/services/competency-service";

export interface ICometencyRepository<T> {
  call: () => Promise<T>;
}

export class CometencyRepository
  implements ICometencyRepository<ProbationTableModel<CompetencyModel>>
{
  constructor(private readonly service: ICompetencyService<NextResponse>) {}
  async call(): Promise<ProbationTableModel<CompetencyModel>> {
    try {
      const response = await this.service.call();
      const data: ProbationTableModel<CompetencyModel> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
