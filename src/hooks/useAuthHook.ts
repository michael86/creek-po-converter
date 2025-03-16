import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { AxiosResponse } from "axios";
import { isCustomAxiosError } from "../utils/typeGuards";

export const useAuthQuery = () =>
  useQuery({
    queryKey: ["authUser"], // key for caching
    queryFn: async () => {
      const response = await api.get<AxiosResponse | CustomAxiosError>("auth/me", {
        withCredentials: true,
      });

      if (isCustomAxiosError(response)) {
        const { message } = response.data as CustomAxiosError;
        throw new Error(message);
      }

      return response.data as AxiosResponse;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: false, // Avoid retrying the request automatically
  });
