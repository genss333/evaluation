import { NextResponse } from "next/server";
import { ITimeAttService } from "../../data/services/time-att-service";
import { ProbationTable } from "../entities/probation-table";
import { TimeAttandance } from "../entities/time-attandance";

export interface ITimeAttandanceRepository<T> {
  call: () => Promise<T>;
}

export class TimeAttandanceRepository
  implements ITimeAttandanceRepository<ProbationTable<TimeAttandance>>
{
  constructor(private readonly service: ITimeAttService<NextResponse>) {}
  async call(): Promise<ProbationTable<TimeAttandance>> {
    try {
      const response = await this.service.call();
      const data: ProbationTable<TimeAttandance> = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
}
