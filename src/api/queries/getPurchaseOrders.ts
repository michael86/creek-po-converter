import { useSuspenseQuery } from "@tanstack/react-query";
import { FetchPoNames } from "../../types/api";
import api from "../index";

export const fetchPoNames = () =>
  useSuspenseQuery({
    queryKey: ["view-pos"],
    queryFn: fetchPurchaseOrders,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

const fetchPurchaseOrders = async (): Promise<FetchPoNames> => {
  const res = await api.get<FetchPoNames>("purchase-order/names");
  return res.data;
};
