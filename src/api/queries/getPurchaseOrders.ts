import { useSuspenseQuery } from "@tanstack/react-query";
import { FetchPoNames } from "../../types/api";
import api from "../index";

export const fetchPoNames = () =>
  useSuspenseQuery({
    queryKey: ["view-pos"],
    queryFn: fetchPurchaseOrders,
  });

const fetchPurchaseOrders = async (): Promise<FetchPoNames> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await api.get<FetchPoNames>("purchase-order/names");
  return res.data;
};
