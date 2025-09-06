import { NextResponse } from "next/server";
import { MoreProbationModel } from "../../data/models/more-probation-model";
import { ProbationTableModel } from "../../data/models/probation-table-model";
import { IMoreProbationService } from "../../data/services/more-probation-service";

export interface IMoreProbationRepository<T> {
  call: () => Promise<T>;
}

export class MoreProbationRepository
  implements IMoreProbationRepository<ProbationTableModel<MoreProbationModel>>
{
  constructor(private readonly service: IMoreProbationService<NextResponse>) {}
  async call(): Promise<ProbationTableModel<MoreProbationModel>> {
    try {
      const response = await this.service.call();
      const data: ProbationTableModel<MoreProbationModel> =
        await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
}
