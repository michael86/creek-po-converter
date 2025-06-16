export interface PurchaseOrderLabel {
  purchaseOrder: string;
  dateReceived: Date;
  quantityReceived: number;
  description: string;
  partNumber: string;
  storageLocation: string | null;
}

// 2) A map from historyId → that single label
export type PurchaseOrderLabelsMap = Record<number, PurchaseOrderLabel>;
