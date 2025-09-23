import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export interface IApiClient {
  request<T>(url: string, options?: RequestInit): Promise<T>;
}

export class ApiClient implements IApiClient {
  private cookieHeader?: string;
  constructor(cookieStore?: ReadonlyRequestCookies) {
    if (cookieStore) {
      const value = cookieStore.get("access_token")?.value;
      this.cookieHeader = value;
    }
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const res = await fetch("/api/auth", {
        method: Method.PATCH,
        cache: "no-store",
      });

      if (res.ok) {
        console.log("Token refreshed successfully.");
        return true;
      } else {
        throw new Error("Failed to refresh token");
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      throw error;
    }
  }

  async request<T>(url: string, options?: RequestInit): Promise<T> {
    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(this.cookieHeader ? { Authorization: this.cookieHeader } : {}),
          ...(options?.headers ?? {}),
        },
        cache: "no-store",
      });

      // if (res.status === 401) {
      //   console.log("isRetry");
      //   console.log(
      //     "Received 401 Unauthorized. Attempting to refresh token..."
      //   );
      //   const refreshSuccess = await this.refreshToken();
      //   if (refreshSuccess) {
      //     return this.request<T>(url, options);
      //   } else {
      //     throw new Error("Session expired. Please log in again.");
      //   }
      // }

      if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`API Error: ${res.status} - ${errorBody}`);
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
