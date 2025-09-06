import { NextResponse } from "next/server";
import { ITimeAttService } from "../../data/services/time-att-service";

export interface ITimeAttandanceRepository<T> {
  call: () => Promise<T>;
}

export class TimeAttandanceRepository<ProbationTimeModel>
  implements ITimeAttandanceRepository<ProbationTimeModel>
{
  constructor(private readonly service: ITimeAttService<NextResponse>) {}
  async call(): Promise<ProbationTimeModel> {
    try {
      const response = await this.service.call();
      const data: ProbationTimeModel = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
}
