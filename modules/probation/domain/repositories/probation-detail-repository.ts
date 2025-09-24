import { NextResponse } from "next/server";
import { IProbationDetailService } from "../../data/services/probation-detail-service";
import * as entities from "../entities/probation";

export interface IProbationDetailRepository<T> {
  call: (personCode?: string) => Promise<T>;
}

export class ProbationDetailRepository
  implements IProbationDetailRepository<entities.Probation>
{
  constructor(
    private readonly service: IProbationDetailService<NextResponse>
  ) {}
  async call(personCode?: string): Promise<entities.Probation> {
    try {
      const response = await this.service.call();
      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
}
