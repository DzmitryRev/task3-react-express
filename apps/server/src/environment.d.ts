export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      MONGO_DB_URL: string;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
    }
  }
}
