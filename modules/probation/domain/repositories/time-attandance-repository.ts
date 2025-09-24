import { NextResponse } from "next/server";
import { ITimeAttService } from "../../data/services/time-att-service";
import { TimeAttandance } from "../entities/time-attandance";

export interface ITimeAttandanceRepository<T> {
  call: (formID: number) => Promise<T>;
}

export class TimeAttandanceRepository
  implements ITimeAttandanceRepository<TimeAttandance>
{
  constructor(private readonly service: ITimeAttService<NextResponse>) {}
  async call(formID: number): Promise<TimeAttandance> {
    try {
      const response = await this.service.call(formID);
      const data: TimeAttandance = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
