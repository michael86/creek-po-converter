import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PoState {
  uuid: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PoState = {
  uuid: null,
  status: "idle",
  error: null,
};

const poSlice = createSlice({
  name: "purchaseOrder",
  initialState,
  reducers: {
    setUuid: (state, action: PayloadAction<string | null>) => {
      state.uuid = action.payload;
    },
  },
});

export const { setUuid } = poSlice.actions;
export const poReducer = poSlice.reducer;
