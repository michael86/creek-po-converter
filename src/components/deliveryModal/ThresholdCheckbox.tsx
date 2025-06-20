import { FormControlLabel, Checkbox, CircularProgress } from "@mui/material";
import ThresholdWarning from "./ThresoldWarning";
import { useAppDispatch, useAppSelector } from "../../store";
import { setModalMessage } from "../../store/slices/deliveryModal";
import { useToggleThreshold } from "../../hooks/useToggleThreshold";
import { setItems } from "../../store/slices/purchaseOrder";

const ThresholdCheckbox = () => {
  const dispatch = useAppDispatch();

  const message = useAppSelector((state) => state.deliveryModal.message);
  const targetUuid = useAppSelector((state) => state.deliveryModal.targetUuid);
  const items = useAppSelector((state) => state.purchaseOrder.items);

  const selectedItem = (targetUuid && items?.[targetUuid]) || null;
  if (!selectedItem) return null;

  const { id, threshold, quantity, quantityReceived } = selectedItem;
  const quantityAwaited = quantity - quantityReceived;

  const { mutateAsync, isPending } = useToggleThreshold();

  const handleThresholdChange = async () => {
    if (!items) return;

    try {
      dispatch(setModalMessage(null));
      await mutateAsync({ uuid: id, state: !threshold });

      const updatedItems = structuredClone(items);
      updatedItems[id].threshold = threshold === 0 ? 1 : 0;

      dispatch(setItems(updatedItems));
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const validationMessages = error.response.data.errors.map((e: any) => e.msg).join(", ");
        dispatch(setModalMessage(validationMessages));
        console.error("Validation failed:", validationMessages);
      } else {
        dispatch(setModalMessage("An unexpected error occurred, contact support"));
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <FormControlLabel
      disabled={!!threshold && quantityAwaited <= 0}
      control={
        isPending ? (
          <CircularProgress size={24} />
        ) : (
          <Checkbox checked={!!threshold} onChange={handleThresholdChange} />
        )
      }
      label={
        <>
          Threshold{" "}
          {(threshold === 1 || message) && (
            <ThresholdWarning
              message={message || undefined}
              sx={message ? { color: "red" } : undefined}
            />
          )}
        </>
      }
    />
  );
};

export default ThresholdCheckbox;
