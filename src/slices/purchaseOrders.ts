import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PurchaseOrder = {
  purchaseOrder: string;
  orderRef: string;
  partNumbers: Parts;
  partial: boolean;
};
export type PurchaseOrders = string[];
export type Parts = [string, number | number[], string, 0 | 1][];
export type SplitParcels = [string, number[]];

interface InitialState extends PurchaseOrder {
  purchaseOrders: PurchaseOrders;
}

const initialState: InitialState = {
  purchaseOrders: [], //list of purchase orders available
  purchaseOrder: "", //the order we're working with
  orderRef: "",
  partNumbers: [["", 0, "", 0]], //name, count, description, partial
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
      state.partNumbers = action.payload.partNumbers;
    },
    setPartCount: (state, action: PayloadAction<Parts>) => {
      state.partNumbers = action.payload;
    },
  },
});

export const { setPurchaseOrder, setPurchaseOrders, setPartCount } = purchaseSlice.actions;

export default purchaseSlice.reducer;
