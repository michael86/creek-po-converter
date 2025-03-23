import { PurchaseOrderItems } from "../types/api";

export const createData = (data: PurchaseOrderItems) => {
  return {
    name: data.partNumber,
    description: data.description,
    quantity: data.quantity,
    quantityReceived: data.quantityReceived,
    storageLocation: data.storageLocation,
    dueDate: data.dueDate,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
};
