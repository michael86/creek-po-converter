import api from "../index";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () =>
  useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const res = await api.post("user/logout", {}, { withCredentials: true });

      return res.data;
    },
  });
