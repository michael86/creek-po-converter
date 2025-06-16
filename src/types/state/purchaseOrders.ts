import { PurchaseOrderLabels } from "../labels";

export type Deliveries = { dateReceived: Date; id: number; quantityReceived: number }[];

export interface Items {
  deliveries: Deliveries | null;
  description: string;
  dueDate: string;
  id: string;
  partNumber: string;
  quantity: number;
  quantityReceived: number;
  storageLocation: string | null;
}

export interface PoState {
  uuid: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  name: string | null;
  ref: string | null;
  items: Items[] | null;
  editMode: boolean;
  deliveriesToPrint: number[] | null;
  labels: Record<number, Record<string, PurchaseOrderLabels>>;
}
