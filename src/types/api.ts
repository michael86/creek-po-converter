export interface AuthMe {
  email: string;
  name: string;
  role: number;
}

export interface FetchPoNames {
  status: "success";
  data: { poNumber: string; uuid: string }[];
}

export interface PurchaseOrderItems {
  description: string;
  dueDate: string;
  partNumber: string;
  quantity: number;
  quantityReceived: number;
  storageLocation: string | null;
}
export interface FetchCompletePurchaseOrder {
  status: "success";
  data: {
    items: PurchaseOrderItems[];
    orderRef: string;
    ponumber: string;
  };
}
