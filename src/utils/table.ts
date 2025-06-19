import { CellData, Item, ModalData } from "../types/state/purchaseOrders";

export const createCellData = (data: Item): CellData => {
  return {
    id: data.id,
    partNumber: data.partNumber,
    description: data.description,
    quantity: data.quantity,
    quantityReceived: data.quantityReceived,
    storageLocation: data.storageLocation,
    dueDate: data.dueDate,
  };
};

export const createModalData = (data: Item): ModalData => {
  return {
    itemUuid: data.id,
    name: data.partNumber,
    quantity: data.quantity,
    quantityReceived: data.quantityReceived,
    thresholdChecked: !!data.threshold,
  };
};
