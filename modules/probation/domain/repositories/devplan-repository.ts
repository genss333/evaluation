import { NextResponse } from "next/server";
import { IDevplanService } from "../../data/services/devplan-service";
import { Devplan } from "../entities/probation-devplan";
import { ProbationTable } from "../entities/probation-table";

export interface IDevplanRepository<T> {
  call: () => Promise<T>;
}

export class DevplanRepository
  implements IDevplanRepository<ProbationTable<Devplan>>
{
  constructor(private readonly service: IDevplanService<NextResponse>) {}
  async call(): Promise<ProbationTable<Devplan>> {
    try {
      const response = await this.service.call();
      const data: ProbationTable<Devplan> = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
}
