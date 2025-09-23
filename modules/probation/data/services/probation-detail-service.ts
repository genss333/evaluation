import { IApiClient, Method } from "@/lib/api-client";

export interface IProbationDetailService<T> {
  call: (personCode?: string) => Promise<T>;
}

export class ProbationDetailService<T> implements IProbationDetailService<T> {
  constructor(private readonly api: IApiClient) {}

  async call(personCode?: string): Promise<T> {
    try {
      const response = await this.api.request(
        `${process.env.NEXT_PUBLIC_API_URL}/eval/forms`,
        {
          method: Method.GET,
          // credentials: "include",
        }
      );
      return response as T;
    } catch (error) {
      throw error;
    }
  }
}
