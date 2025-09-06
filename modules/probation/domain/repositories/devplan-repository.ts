import { NextResponse } from "next/server";
import { ProbationTableModel } from "../../data/models/probation-table-model";
import { IDevplanService } from "../../data/services/devplan-service";
import { DevplanModel } from "../../data/models/probation-devplan-model";

export interface IDevplanRepository<T> {
  call: () => Promise<T>;
}

export class DevplanRepository
  implements
    IDevplanRepository<ProbationTableModel<DevplanModel>>
{
  constructor(private readonly service: IDevplanService<NextResponse>) {}
  async call(): Promise<ProbationTableModel<DevplanModel>> {
    try {
      const response = await this.service.call();
      const data: ProbationTableModel<DevplanModel> =
        await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
}