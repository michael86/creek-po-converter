import { FetchUsers } from "../../types/api";
import api from "../index";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get<FetchUsers>("manage/users/");

      return res.data.data.users;
    },
  });
};
