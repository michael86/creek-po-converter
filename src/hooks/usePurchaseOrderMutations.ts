import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/reactQueryClient";
import { useAppDispatch } from "../store";
import { setUuid } from "../store/slices/purchaseOrder";
import { deletePurchaseOrder } from "../api/purchaseOrders";
import { DeletePurchaseOrder } from "../types/api";

export function useDeletePurchaseOrder() {
  const dispatch = useAppDispatch();

  return useMutation<
    DeletePurchaseOrder, // TData
    Error, // TError
    string // TVariables (uuid)
  >({
    mutationFn: (uuid: string) => deletePurchaseOrder(uuid),

    onSuccess: (data) => {
      if (data.message === "Purchase order deleted") {
        dispatch(setUuid(null));
        queryClient.invalidateQueries({ queryKey: ["view-pos"] });
      }
    },

    onError: (err) => {
      console.error("Delete PO failed:", err);
    },
  });
}
