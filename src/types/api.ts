import { Items } from "./state/purchaseOrders";

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
  id: number;
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
    items: Items[];
    orderRef: string;
    poNumber: string;
  };
}

export interface DeletePurchaseOrder {
  message: "Purchase order deleted";
  status: "success";
}

export interface FetchLocations {
  status: "success";
  data: [{ name: string; id: string }];
}

export type User = {
  id: number;
  email: string;
  name: string;
  role: number;
  dateCreated: Date;
};

export interface FetchUsers {
  status: "success";
  data: { users: User[]; status: number; message: string };
}

export interface UpdateGenericResponse {
  status: "success" | "error";
  message: string;
  data?: any;
}

export type useQueryStatus = "idle" | "loading" | "error";

export interface ValidateRole {
  status: "success" | "Error";
}
