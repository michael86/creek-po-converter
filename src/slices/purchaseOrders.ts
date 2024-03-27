import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PurchaseOrder = {
  purchaseOrder: string;
  orderRef: string;
  parts: Parts;
  split?: SplitParcels;
  backgroundColor?: string;
  partial: boolean;
};
export type PurchaseOrders = string[];
export type Parts = [string, number, string][];
export type SplitParcels = [string, number[]];

interface InitialState extends PurchaseOrder {
  purchaseOrders: PurchaseOrders;
}

const initialState: InitialState = {
  purchaseOrders: [], //list of purchase orders available
  purchaseOrder: "", //the order we're working with
  orderRef: "",
  parts: [["", 0, ""]], //name, count, description
  split: undefined, //IF order is split into multiple parcels then [name, [parcel, parcel...]]
  backgroundColor: undefined, //If order split, then link all parcels by color (rgb(x,x,x))
  partial: false,
};

export const purchaseSlice = createSlice({
  name: "purchaseOrders",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPurchaseOrders: (state, action: PayloadAction<PurchaseOrders>) => {
      state.purchaseOrders = action.payload;
    },
    setPurchaseOrder: (state, action: PayloadAction<PurchaseOrder>) => {
      state.purchaseOrder = action.payload.purchaseOrder;
      state.orderRef = action.payload.orderRef;
      state.parts = action.payload.parts;
    },
  },
});

export const { setPurchaseOrder, setPurchaseOrders } = purchaseSlice.actions;

export default purchaseSlice.reducer;
