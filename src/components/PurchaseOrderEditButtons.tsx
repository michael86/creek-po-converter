import api from "../api";
import { Box, Button, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../store";
import { DeletePurchaseOrder } from "../types/api";
import { setUuid } from "../store/slices/purchaseOrder";
import { queryClient } from "../lib/reactQueryClient";
import { useState } from "react";

const PurchaseOrderEditButtons = () => {
  const uuid = useAppSelector((state) => state.purchaseOrder.uuid);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<null | string>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      setError(null); // Clear error before request
      if (!uuid) throw new Error("No UUID selected");

      const { data } = await api.delete<DeletePurchaseOrder>(`/purchase-order/delete/${uuid}`, {
        withCredentials: true,
      });
      return data;
    },
    onSuccess: (data) => {
      if (data?.message === "Purchase order deleted") {
        dispatch(setUuid(null));
        queryClient.invalidateQueries({ queryKey: ["view-pos"] });
      }
    },
    onError: (error) => {
      setError(() => error.message || "An unknown error occurred");
      setTimeout(() => setError(null), 3000);
    },
  });

  return (
    <>
      {error && (
        <Typography variant="body1" color="red" align="center">
          {error}
        </Typography>
      )}
      <Box display={"flex"} justifyContent={"space-around"}>
        <Button variant="contained">Edit</Button>
        <Button variant="contained" onClick={() => mutation.mutate()} disabled={mutation.isPending}>
          {mutation.isPending ? "Deleting..." : "Delete"}
        </Button>
      </Box>
    </>
  );
};

export default PurchaseOrderEditButtons;
