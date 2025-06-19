import { useAppDispatch, useAppSelector } from "../store";
import { setLabels } from "../store/slices/purchaseOrder";
import { Item } from "../types/state/purchaseOrders";

type UseLabelManager = () => {
  handleLabelsChange: (row: Item, historyId: number) => void;
};
export const useLabelManager: UseLabelManager = () => {
  const dispatch = useAppDispatch();
  const purchaseOrder = useAppSelector((state) => state.purchaseOrder);

  const handleLabelsChange = (row: Item, historyId: number) => {
    if (purchaseOrder.labels[row.partNumber]?.[historyId]) {
      const newLabels = { ...purchaseOrder.labels };
      const updatedHistoryMap = { ...newLabels[row.partNumber] };
      delete updatedHistoryMap[historyId];

      if (Object.keys(updatedHistoryMap).length === 0) {
        delete newLabels[row.partNumber];
      } else {
        newLabels[row.partNumber] = updatedHistoryMap;
      }

      dispatch(setLabels(newLabels));
      return;
    }

    if (!row.deliveries || !row.deliveries[historyId]) {
      console.error("Invalid historyId or row.history is undefined");
      return;
    }

    const newLabels = {
      ...purchaseOrder.labels,
      [row.partNumber]: {
        ...purchaseOrder.labels[row.partNumber],
        [historyId]: {
          purchaseOrder: purchaseOrder.orderName || "",
          dateReceived: row.deliveries[historyId].dateReceived,
          quantityReceived: row.deliveries[historyId].quantityReceived,
          description: row.description,
          partNumber: row.partNumber,
          storageLocation: row.storageLocation || null,
        },
      },
    };

    dispatch(setLabels(newLabels));
  };

  return { handleLabelsChange };
};
