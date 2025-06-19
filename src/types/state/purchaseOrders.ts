import { PurchaseOrderLabelsMap } from "../labels";

export interface PoState {
  uuid: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  orderName: string | null;
  orderRef: string | null;
  items: Items[] | null;
  selectedItem: ModalData | null;
  editMode: boolean;
  labels: PurchaseOrderLabelsMap;
}

export interface Item {
  id: string;
  partNumber: string;
  description: string;
  quantity: number;
  quantityReceived: number;
  dueDate: Date;
  deliveries: Deliveries | null;
  threshold: number;
  storageLocation: string | null;
}
export type Items = Item[];

export type Delivery = { dateReceived: Date; id: number; quantityReceived: number };
export type Deliveries = Delivery[];

export interface CellData {
  id: string;
  partNumber: string;
  description: string;
  quantity: number;
  quantityReceived: number;
  storageLocation: string | null;
  dueDate: Date;
}

export interface ModalData {
  itemUuid: string;
  name: string;
  quantity: number;
  quantityReceived: number;
  thresholdChecked: boolean;
}
