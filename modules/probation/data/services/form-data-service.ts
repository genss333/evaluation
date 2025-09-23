import { IApiClient, Method } from "@/lib/api-client";

export interface IFormDataService<T> {
  call(formId: number): Promise<T>;
}

export class FormDataService<T> implements IFormDataService<T> {
  constructor(private readonly api: IApiClient) {}
  async call(formId: number): Promise<T> {
    try {
      const response = await this.api.request(
        `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/eval?formID=${formId}`,
        {
          method: Method.GET,
          credentials: "include",
        }
      );
      return response as T;
    } catch (error) {
      throw error;
    }
  }
}
