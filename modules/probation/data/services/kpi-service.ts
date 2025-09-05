import { IApiClient, Method } from "@/lib/api-client";

export interface IKpiService<T> {
  call: () => Promise<T>;
}

export class KpiService<T> implements IKpiService<T> {
  constructor(private readonly api: IApiClient) {}

  async call(): Promise<T> {
    try {
      const response = await this.api.request(
        `${process.env.NEXT_PUBLIC_API_URL}/api/mock/kpi`,
        { method: Method.GET }
      );
      return response as T;
    } catch (error) {
      throw error;
    }
  }
}
