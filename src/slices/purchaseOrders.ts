import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Parcel = { dateReceived?: number; amountReceived: number };

export type PartNumber = {
  name: string;
  partial: 1 | 0;
  totalOrdered: number;
  description: string;
  partsReceived: Parcel[];
  location?: string;
  lastEdited?: number;
};

export type PartNumbers = {
  [key: string]: PartNumber;
};

export type PurchaseOrder = {
  dateCreated: number;
  purchaseOrder: string;
  orderRef: string;
  partNumbers: PartNumbers;
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
    setPartNumbers: (state, action: PayloadAction<PartNumbers>) => {
      state.order!.partNumbers = action.payload;
    },
  },
});

export const { setPurchaseOrder, setPurchaseOrders, setPart, setPartPartial, setPartNumbers } =
  purchaseSlice.actions;

export default purchaseSlice.reducer;
