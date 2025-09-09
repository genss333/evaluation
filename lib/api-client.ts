import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export interface IApiClient {
  request<T>(url: string, options?: RequestInit): Promise<T>;
}

export class ApiClient implements IApiClient {
  private cookieHeader?: string;

  constructor(cookieStore?: ReadonlyRequestCookies) {
    if (cookieStore) {
      const name = cookieStore.get("access_token")?.name;
      const value = cookieStore.get("access_token")?.value;
      this.cookieHeader = `${name}=${value}`;
    }
  }
  async request<T>(url: string, options?: RequestInit): Promise<T> {
    const isDevelopment = process.env.NODE_ENV === "development";
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

      if (isDevelopment) {
        console.log(`\n--- 🚀 API Request ---`);
        console.log(`[${options?.method || "GET"}] ${url}`);
        if (options?.body) {
          console.log(
            "Body:",
            JSON.stringify(JSON.parse(options.body as string), null, 2)
          );
        }
        console.log(`-----------------------`);
      }

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
