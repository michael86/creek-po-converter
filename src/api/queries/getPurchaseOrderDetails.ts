import { FetchCompletePurchaseOrder } from "../../types/api";
import api from "../index";

export const fetchPo = async (uuid: string): Promise<FetchCompletePurchaseOrder> => {
  const res = await api.get<FetchCompletePurchaseOrder>(`purchase-order/${uuid}`);
  return res.data;
};
