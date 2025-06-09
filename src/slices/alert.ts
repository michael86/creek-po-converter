import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Status = "success" | "error";

type InitState = {
  show: boolean;
  type: Status;
  message: string;
};
const initialState: InitState = {
  show: false,
  type: "success",
  message: "",
};

export const alert = createSlice({
  name: "alert",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setToastShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
    setToastType: (state, action: PayloadAction<"success" | "error">) => {
      state.type = action.payload;
    },
    setToastMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setToast: (state, action: PayloadAction<InitState>) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.show = action.payload.show;
    },
  },
});

export const { setToastShow, setToastMessage, setToastType, setToast } = alert.actions;

export default alert.reducer;
