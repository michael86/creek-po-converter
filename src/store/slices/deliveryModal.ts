import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeliveryModalState {
  showModal: boolean;
  message: string | null;
}

const initialState: DeliveryModalState = {
  showModal: false,
  message: null,
};

const deliveryModalSlice = createSlice({
  name: "deliveryModal",
  initialState,
  reducers: {
    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    setModalMessage: (state, action: PayloadAction<string | null>) => {
      state.message = action.payload;
    },
    resetModal: () => initialState,
  },
});

export const { setShowModal, setModalMessage, resetModal } = deliveryModalSlice.actions;
export const deliveryModalReducer = deliveryModalSlice.reducer;
