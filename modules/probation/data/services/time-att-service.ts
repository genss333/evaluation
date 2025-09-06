import { IApiClient, Method } from "@/lib/api-client";

export interface ITimeAttService<T> {
  call: () => Promise<T>;
}

export class TimeAttService<T> implements ITimeAttService<T> {
  constructor(private readonly api: IApiClient) {}

  async call(): Promise<T> {
    try {
      const response = await this.api.request(
        `${process.env.NEXT_PUBLIC_API_URL}/api/mock/time-attendance`,
        { method: Method.GET }
      );
      return response as T;
    } catch (error) {
      throw error;
    }
  }
}
