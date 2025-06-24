import { useMutation } from "@tanstack/react-query";
import api from "../index";

type PutEntityParams =
  | { route: "location"; state: string; amount: number }
  | { route: "prefix"; prefix: string };

export const putEntity = () =>
  useMutation({
    mutationFn: async (data: PutEntityParams) => {
      if (data.route === "location") {
        await api.put("locations/add", {
          location: data.state,
          amount: data.amount,
        });
      } else {
        await api.put("prefix/add", {
          prefix: data.prefix,
        });
      }
    },
    onSuccess: (res) => res,
    onError: (err) => err,
  });
