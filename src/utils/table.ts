import { Items } from "../types/state/purchaseOrders";

export const createData = (data: Items) => {
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
