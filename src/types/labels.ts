export interface PurchaseOrderLabel {
  purchaseOrder: string;
  dateReceived: Date;
  quantityReceived: number;
  description: string;
  partNumber: string;
  storageLocation: string | null;
}

/**
 * As there's multiple partnumbers, we need to group the labels by part numbers to prevent them being overwritten
 * if there's multiple rows for the same part (scheduled deliveries across multipel months), we can just group then
 * under the same part number as it's on;y the date that will change
 * {
 *  partNumber: {
 *    PurchaseOrderLabel
 *  },
 *  partNumber2: {
 *    PurchaseOrderLabel
 *  },
 * }
 */
export type PurchaseOrderLabelsMap = Record<string, Record<number, PurchaseOrderLabel>>;
