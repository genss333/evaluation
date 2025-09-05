import { IApiClient, Method } from "@/lib/api-client";

export interface IDevplanService<T> {
  call: () => Promise<T>;
}

export class DevplanService<T> implements IDevplanService<T> {
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
