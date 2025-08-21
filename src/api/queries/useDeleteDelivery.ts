import api from "../index";
import { useMutation } from "@tanstack/react-query";

export const useDeleteDelivery = () =>
  useMutation({
    mutationKey: ["delete-delivery"],
    mutationFn: async ({ id }: { id: string }) => {
      const res = await api.post("/deliveries/delete", {
        id,
      });

      return res.data;
    },
  });
