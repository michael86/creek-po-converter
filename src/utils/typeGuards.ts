import { AxiosResponse } from "axios";

// Type guard to check if the response is a CustomAxiosError
export const isCustomAxiosError = (
  data: AxiosResponse<any> | CustomAxiosError
): data is CustomAxiosError => {
  const status = data.status;
  if (!status) return false;

  return status >= 200 && status < 300;
};
