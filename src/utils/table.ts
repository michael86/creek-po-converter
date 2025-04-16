import { PurchaseOrderItems } from "../types/api";

export const createData = (data: PurchaseOrderItems) => {
  return {
    id: data.id,
    name: data.partNumber,
    description: data.description,
    quantity: data.quantity,
    quantityReceived: data.quantityReceived,
    storageLocation: data.storageLocation,
    dueDate: data.dueDate,
    history: data.deliveries,
  };
};
