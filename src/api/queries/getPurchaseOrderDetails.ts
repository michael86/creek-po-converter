import { FetchCompletePurchaseOrder } from "../../types/api";
import api from "../index";

export const fetchPo = async (uuid: string): Promise<FetchCompletePurchaseOrder> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await api.get<FetchCompletePurchaseOrder>(`purchase-order/${uuid}`);
  console.log("res.data", res.data);
  return res.data;
};
