import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PoState, ModalData, Item } from "../../types/state/purchaseOrders";
import { PurchaseOrderLabelsMap } from "../../types/labels";

const initialState: PoState = {
  uuid: null,
  status: "idle",
  error: null,
  orderName: null,
  orderRef: null,
  items: null,
  editMode: false,
  selectedItem: null,
  labels: {},
};

const poSlice = createSlice({
  name: "purchaseOrder",
  initialState,
  reducers: {
    setUuid: (state, action: PayloadAction<string | null>) => {
      state.uuid = action.payload;
      state.labels = {}; // Reset labels when UUID changes
    },
    setName: (state, action: PayloadAction<string | null>) => {
      state.orderName = action.payload;
    },
    setRef: (state, action: PayloadAction<string | null>) => {
      state.orderRef = action.payload;
    },
    setItems: (state, action: PayloadAction<Record<string, Item>>) => {
      state.items = action.payload;
    },
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload;
    },
    setLabels: (state, action: PayloadAction<PurchaseOrderLabelsMap>) => {
      state.labels = action.payload;
    },
    setSelectedItem: (state, action: PayloadAction<ModalData | null>) => {
      state.selectedItem = action.payload;
    },
  },
});

export const { setUuid, setName, setItems, setRef, setEditMode, setLabels, setSelectedItem } =
  poSlice.actions;
export const poReducer = poSlice.reducer;
