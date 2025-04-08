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
  dueDate: Date;
  partNumber: string;
  quantity: number;
  quantityReceived: number;
  storageLocation: string | null;
  deliveries: {
    quantityReceived: number;
    dateReceived: Date;
  }[];
}

export interface FetchCompletePurchaseOrder {
  status: "success";
  data: {
    items: PurchaseOrderItems[];
    orderRef: string;
    ponumber: string;
  };
}

export interface DeletePurchaseOrder {
  message: "Purchase order deleted";
  status: "success";
}

export interface FetchLocations {
  status: "success";
  data: [{ location: string; uuid: string }];
}
