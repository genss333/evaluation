import { NextResponse } from "next/server";
import { ICompetencyService } from "../../data/services/competency-service";
import { Competency } from "../entities/probation-competency";
import { ProbationTable } from "../entities/probation-table";

export interface ICometencyRepository<T> {
  call: () => Promise<T>;
}

export class CometencyRepository
  implements ICometencyRepository<ProbationTable<Competency>>
{
  constructor(private readonly service: ICompetencyService<NextResponse>) {}
  async call(): Promise<ProbationTable<Competency>> {
    try {
      const response = await this.service.call();
      const data: ProbationTable<Competency> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
