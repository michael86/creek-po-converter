export interface PurchaseOrderLabel {
  dateReceived: Date;
  quantityReceived: number;
  description: string;
  partNumber: string;
  storageLocation: string | null;
}

/**
  {
    UUID: PurchaseOrderLabel,
    UUID: PurchaseOrderLabel,
    UUID: PurchaseOrderLabel,
  }
 */

export type PurchaseOrderLabelsMap = Record<string /* delivery.uuid */, PurchaseOrderLabel>;
