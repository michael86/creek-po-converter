import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Parcel = { dateReceived?: number; amountReceived: number };

export type PartNumber = {
  name: string;
  partial: 1 | 0;
  totalOrdered: number;
  description: string;
  partsReceived: Parcel[];
  location: string | null;
  lastEdited?: number;
  dateDue: number;
  lineId: number;
};

export type PurchaseOrder = {
  dateCreated: number;
  purchaseOrder: string;
  orderRef: string;
  partNumbers: PartNumber[];
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
    setPart: (state, action: PayloadAction<{ index: number; part: PartNumber }>) => {
      const { index } = action.payload;
      state.order!.partNumbers[index] = action.payload.part;
    },
    setPartPartial: (state, action: PayloadAction<{ index: number; partial: 0 | 1 }>) => {
      const { index } = action.payload;
      state.order!.partNumbers[index].partial = action.payload.partial;
    },
    setPartNumbers: (state, action: PayloadAction<PartNumber[]>) => {
      state.order!.partNumbers = action.payload;
    },
  },
});

export const { setPurchaseOrder, setPurchaseOrders, setPart, setPartPartial, setPartNumbers } =
  purchaseSlice.actions;

export default purchaseSlice.reducer;
