import { NextResponse } from "next/server";
import { ProbationTableModel } from "../../data/models/probation-table-model";
import { TimeAttandanceModel } from "../../data/models/time-attandance-model";
import { ITimeAttService } from "../../data/services/time-att-service";

export interface ITimeAttandanceRepository<T> {
  call: () => Promise<T>;
}

export class TimeAttandanceRepository
  implements
    ITimeAttandanceRepository<ProbationTableModel<TimeAttandanceModel>>
{
  constructor(private readonly service: ITimeAttService<NextResponse>) {}
  async call(): Promise<ProbationTableModel<TimeAttandanceModel>> {
    try {
      const response = await this.service.call();
      const data: ProbationTableModel<TimeAttandanceModel> =
        await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
}
