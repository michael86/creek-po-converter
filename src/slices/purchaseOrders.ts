import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PartNumber = {
  name: string;
  partial: 1 | 0;
  totalOrdered: number;
  description: string;
  partsReceived: number[];
};

export type PurchaseOrder = {
  purchaseOrder: string;
  orderRef: string;
  partNumbers: {
    [key: string]: PartNumber;
  };
};

export type PurchaseOrders = string[];

interface InitialState {
  purchaseOrders: PurchaseOrders;
  order?: PurchaseOrder;
}

const initialState: InitialState = {
  purchaseOrders: [], //list of purchase orders available
  order: undefined,
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
      state.order = action.payload;
    },
    setPart: (state, action: PayloadAction<{ key: string; part: PartNumber }>) => {
      const key = action.payload.key;
      state.order!.partNumbers[key] = action.payload.part;
    },
    setPartPartial: (state, action: PayloadAction<{ key: string; partial: 0 | 1 }>) => {
      const key = action.payload.key;
      state.order!.partNumbers[key].partial = action.payload.partial;
    },
  },
});

export const { setPurchaseOrder, setPurchaseOrders, setPart, setPartPartial } =
  purchaseSlice.actions;

export default purchaseSlice.reducer;
