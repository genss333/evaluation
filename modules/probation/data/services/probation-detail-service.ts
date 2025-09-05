import { IApiClient, Method } from "@/lib/api-client";

export interface IProbationDetailService<T> {
  call: () => Promise<T>;
}

export class ProbationDetailService<T> implements IProbationDetailService<T> {
  constructor(private readonly api: IApiClient) {}

  async call(): Promise<T> {
    try {
      const response = await this.api.request("", { method: Method.GET });
      return response as T;
    } catch (error) {
      throw error;
    }
  }
}
