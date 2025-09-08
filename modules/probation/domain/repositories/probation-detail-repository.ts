import { NextResponse } from "next/server";
import { IProbationDetailService } from "../../data/services/probation-detail-service";

export interface IProbationDetailRepository<T> {
  call: (personCode?: string) => Promise<T>;
}

export class ProbationDetailRepository<ProbationModel>
  implements IProbationDetailRepository<ProbationModel>
{
  constructor(
    private readonly service: IProbationDetailService<NextResponse>
  ) {}
  async call(personCode?: string): Promise<ProbationModel> {
    try {
      const response = await this.service.call(personCode);
      const data: ProbationModel = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
}
