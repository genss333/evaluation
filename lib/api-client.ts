import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export interface IApiClient {
  request<T>(url: string, options?: RequestInit): Promise<T>;
}

export class ApiClient implements IApiClient {
  private cookieHeader?: string;

  constructor(cookieStore?: ReadonlyRequestCookies) {
    if (cookieStore) {
      this.cookieHeader = cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; ");
    }
  }
  async request<T>(url: string, options?: RequestInit): Promise<T> {
    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(this.cookieHeader && { Cookie: this.cookieHeader }),
          ...(options?.headers ?? {}),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }

      return res as T;
    } catch (error) {
      throw error;
    }
  }
}

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}
