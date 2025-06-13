import { AxiosResponse } from "axios";

// Type guard to check if the response is a CustomAxiosError
export const isCustomAxiosError = (
  data: AxiosResponse<any> | CustomAxiosError
): data is CustomAxiosError => {
  const status = data.status;
  if (!status) return false;

  return status >= 200 && status < 300;
};

// Typeguard to check is a string is key of
export function isKeyOf<T extends object>(obj: T, key: PropertyKey): key is keyof T {
  return key in obj;
}
