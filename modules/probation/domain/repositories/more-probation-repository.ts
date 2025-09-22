import { NextResponse } from "next/server";
import { IMoreProbationService } from "../../data/services/more-probation-service";
import { MoreProbation } from "../entities/more-probation";
import { ProbationTable } from "../entities/probation-table";

export interface IMoreProbationRepository<T> {
  call: () => Promise<T>;
}

export class MoreProbationRepository
  implements IMoreProbationRepository<ProbationTable<MoreProbation>>
{
  constructor(private readonly service: IMoreProbationService<NextResponse>) {}
  async call(): Promise<ProbationTable<MoreProbation>> {
    try {
      const response = await this.service.call();
      const data: ProbationTable<MoreProbation> = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
}
