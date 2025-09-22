import { NextResponse } from "next/server";
import { IProbationDetailService } from "../../data/services/probation-detail-service";

export interface IProbationDetailRepository<T> {
  call: (personCode?: string) => Promise<T>;
}

export class ProbationDetailRepository<Probation>
  implements IProbationDetailRepository<Probation>
{
  constructor(
    private readonly service: IProbationDetailService<NextResponse>
  ) {}
  async call(personCode?: string): Promise<Probation> {
    try {
      const response = await this.service.call(personCode);
      const data: Probation = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
}
