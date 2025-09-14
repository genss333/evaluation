import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export interface IApiClient {
  request<T>(url: string, options?: RequestInit): Promise<T>;
}

export class ApiClient implements IApiClient {
  private cookieHeader?: string;

  private refreshTokenPromise: Promise<boolean> | null = null;

  constructor(cookieStore?: ReadonlyRequestCookies) {
    if (cookieStore) {
      const name = cookieStore.get("access_token")?.name;
      const value = cookieStore.get("access_token")?.value;
      this.cookieHeader = `${name}=${value}`;
    }
  }

  private refreshToken(): Promise<boolean> {
    if (!this.refreshTokenPromise) {
      this.refreshTokenPromise = (async () => {
        try {
          const res = await fetch("/api/auth", {
            method: Method.PATCH,
            cache: "no-store",
          });

          if (res.ok) {
            console.log("Token refreshed successfully.");
            return true; // Resolves the promise with true
          } else {
            throw new Error("Failed to refresh token"); // Rejects the promise
          }
        } catch (error) {
          console.error("Failed to refresh token:", error);
          throw error; // Re-throws the error, rejecting the promise
        } finally {
          // This finally block is tied to the async function
          console.log("Resetting refresh token promise.");
          this.refreshTokenPromise = null;
        }
      })();
    }
    return this.refreshTokenPromise;
  }

  async request<T>(
    url: string,
    options?: RequestInit,
    isRetry: boolean = false
  ): Promise<T> {
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

      if (res.status === 401 && !isRetry) {
        console.log(
          "Received 401 Unauthorized. Attempting to refresh token..."
        );
        const refreshSuccess = await this.refreshToken();
        if (refreshSuccess) {
          return this.request<T>(url, options, true);
        } else {
          throw new Error("Session expired. Please log in again.");
        }
      }

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
