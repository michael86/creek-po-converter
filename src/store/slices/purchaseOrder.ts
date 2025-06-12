import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PoState, Items } from "../../types/state/purchaseOrders";

const initialState: PoState = {
  uuid: null,
  status: "idle",
  error: null,
  name: null,
  ref: null,
  items: null,
};

const poSlice = createSlice({
  name: "purchaseOrder",
  initialState,
  reducers: {
    setUuid: (state, action: PayloadAction<string | null>) => {
      state.uuid = action.payload;
    },
    setName: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload;
    },
    setRef: (state, action: PayloadAction<string | null>) => {
      state.ref = action.payload;
    },
    setItems: (state, action: PayloadAction<Items[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setUuid, setName, setItems, setRef } = poSlice.actions;
export const poReducer = poSlice.reducer;
