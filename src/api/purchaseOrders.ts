import api from "../api";
import type { DeletePurchaseOrder } from "../types/api";

export async function deletePurchaseOrder(uuid: string) {
  const { data } = await api.delete<DeletePurchaseOrder>(`/purchase-order/delete/${uuid}`, {
    withCredentials: true,
  });
  return data;
}
