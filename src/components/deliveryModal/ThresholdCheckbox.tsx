import { FormControlLabel, Checkbox, CircularProgress } from "@mui/material";
import ThresholdWarning from "./ThresoldWarning";
import { useAppDispatch, useAppSelector } from "../../store";
import { setModalMessage } from "../../store/slices/deliveryModal";
import { useToggleThreshold } from "../../hooks/useToggleThreshold";
import { setSelectedItem } from "../../store/slices/purchaseOrder";

const ThresholdCheckbox = () => {
  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state) => state.deliveryModal);
  const { selectedItem } = useAppSelector((state) => state.purchaseOrder);

  const { mutateAsync, isPending } = useToggleThreshold();
  if (!selectedItem) return null;

  const { itemUuid, thresholdChecked, quantity, quantityReceived } = selectedItem;
  const quantityAwaited = quantity - quantityReceived;

  const handleThresholdChange = async () => {
    try {
      dispatch(setModalMessage(null));
      await mutateAsync({ uuid: itemUuid, state: !thresholdChecked });

      const clone = structuredClone(selectedItem);
      clone.thresholdChecked = !thresholdChecked;

      dispatch(setSelectedItem(clone));
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const validationMessages = error.response.data.errors.map((e: any) => e.msg).join(", ");
        dispatch(setModalMessage(validationMessages));
        console.error("Validation failed:", validationMessages);
      } else {
        console.error("Unexpected error:", error);
        dispatch(setModalMessage("An unexpected error occured, contact support"));
      }
    }
  };

  return (
    <FormControlLabel
      disabled={thresholdChecked && quantityAwaited <= 0}
      control={
        isPending ? (
          <CircularProgress size={24} />
        ) : (
          <Checkbox checked={!!thresholdChecked} onChange={handleThresholdChange} />
        )
      }
      label={
        <>
          threshold{" "}
          {(thresholdChecked || message) && (
            <ThresholdWarning
              message={message ? message : undefined}
              sx={message ? { color: "red" } : undefined}
            />
          )}
        </>
      }
    />
  );
};

export default ThresholdCheckbox;
