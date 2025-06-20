import { useAppDispatch, useAppSelector } from "../store";
import { setLabels } from "../store/slices/purchaseOrder";
import { Delivery } from "../types/state/purchaseOrders";

export type UseLabelManager = () => {
  handleLabelsChange: (
    delivery: Delivery,
    partNumber: string,
    description: string,
    location: string | null
  ) => void;
};

export const useLabelManager: UseLabelManager = () => {
  const dispatch = useAppDispatch();
  const labels = useAppSelector((state) => state.purchaseOrder.labels);

  const handleLabelsChange = (
    delivery: Delivery,
    partNumber: string,
    description: string,
    location: string | null
  ) => {
    const deliveryId = delivery.id;
    console.log("delivery ", delivery);
    console.log("deliveryId ", deliveryId);

    // Clone the existing labels
    const newLabels = { ...labels };

    if (newLabels[deliveryId]) {
      // Remove label if it already exists
      delete newLabels[deliveryId];
    } else {
      // Add label
      newLabels[deliveryId] = {
        dateReceived: delivery.dateReceived,
        quantityReceived: delivery.quantityReceived,
        description,
        partNumber,
        storageLocation: location || null,
      };
    }

    dispatch(setLabels(newLabels));
  };

  return { handleLabelsChange };
};
