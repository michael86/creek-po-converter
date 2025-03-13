import { AxiosError } from "axios";

declare global {
  interface CustomAxiosError extends AxiosError {
    response?: {
      data?: {
        message?: string;
        status?: string;
      };
      status?: number;
    };
  }
}

export {};
