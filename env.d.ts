declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET_KEY: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_LOCAL_API_URL: string;
  }
}
