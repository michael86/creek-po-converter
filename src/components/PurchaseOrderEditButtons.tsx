import api from "../api";
import { Box, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../store";
import { DeletePurchaseOrder } from "../types/api";
import { setUuid } from "../store/slices/purchaseOrder";
import { queryClient } from "../lib/reactQueryClient";

const PurchaseOrderEditButtons = () => {
  const uuid = useAppSelector((state) => state.purchaseOrder.uuid);
  const dispatch = useAppDispatch();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!uuid) throw new Error("No UUID selected");
      const { data } = await api.delete<DeletePurchaseOrder>(`/purchase-order/delete/${uuid}`, {
        withCredentials: true,
      });
      return data;
    },
    onSuccess: (data) => {
      if (data?.message === "Purchase order deleted") {
        dispatch(setUuid(null)); // Reset selected UUID
        queryClient.invalidateQueries({ queryKey: ["view-pos"] });
      }
    },
    onError: (error) => {
      console.error("Error deleting purchase order:", error);
    },
  });

  return (
    <Box display={"flex"} justifyContent={"space-around"}>
      <Button variant="contained">Edit</Button>
      <Button variant="contained" onClick={() => mutation.mutate()} disabled={mutation.isPending}>
        {mutation.isPending ? "Deleting..." : "Delete"}
      </Button>
    </Box>
  );
};

export default PurchaseOrderEditButtons;
