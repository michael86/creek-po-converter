import api from "../index";
import { useMutation } from "@tanstack/react-query";

export const useUpdateLocation = () =>
  useMutation({
    mutationKey: ["update-location"],
    mutationFn: async ({ itemName, location }: { itemName: string; location: string }) => {
      const res = await api.post("/locations/update", {
        itemName,
        location: location,
      });

      return res.data;
    },
  });
