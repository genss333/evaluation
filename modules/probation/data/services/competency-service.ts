import { IApiClient, Method } from "@/lib/api-client";

export interface ICompetencyService<T> {
  call: () => Promise<T>;
}

export class CompetencyService<T> implements ICompetencyService<T> {
  constructor(private readonly api: IApiClient) {}

  async call(): Promise<T> {
    try {
      const response = await this.api.request(
        `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/mock/competency`,
        { method: Method.GET }
      );
      return response as T;
    } catch (error) {
      throw error;
    }
  }
}
