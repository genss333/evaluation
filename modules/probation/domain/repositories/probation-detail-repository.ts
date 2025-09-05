import { NextResponse } from "next/server";
import { IProbationDetailService } from "../../data/services/probation-detail-service";

export interface IProbationDetailRepository<T> {
  call: () => Promise<T>;
}

export class ProbationDetailRepository<ProbationModel>
  implements IProbationDetailRepository<ProbationModel>
{
  constructor(
    private readonly service: IProbationDetailService<NextResponse>
  ) {}
  async call(): Promise<ProbationModel> {
    try {
      const response = await this.service.call();
      const data: ProbationModel = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
}
