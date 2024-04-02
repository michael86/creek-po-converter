import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PurchaseOrder = {
  purchaseOrder: string;
  orderRef: string;
  partNumbers: {
    [key: string]: {
      name: string;
      orderRef: string;
      quantity: number[];
      partial: 1 | 0;
      totalOrdered: number;
    };
  };
};
export type PurchaseOrders = string[];
export type Parts = [string, number | number[], string, 0 | 1][];

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
    setPartCount: (state, action: PayloadAction<{ key: string; parts: number[] }>) => {
      const key = action.payload.key;
      state.order!.partNumbers[key].quantity = action.payload.parts;
    },
  },
});

export const { setPurchaseOrder, setPurchaseOrders, setPartCount } = purchaseSlice.actions;

export default purchaseSlice.reducer;
