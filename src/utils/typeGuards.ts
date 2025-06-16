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

// Type guard to check if an array has items
/**
 * Returns true if `arr` is an actual array with length > 0.
 * Narrows `arr` from `T[] | null | undefined` down to `T[]`.
 */
export function hasItems<T>(arr: T[] | null | undefined): arr is T[] {
  return Array.isArray(arr) && arr.length > 0;
}
