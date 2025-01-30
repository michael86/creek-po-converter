import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type dataSchema = { hex: string; decimal: number }[];
type print = boolean;

type InitState = {
  data: dataSchema;
  print: print;
  count: number;
};

const initialState: InitState = {
  data: [],
  print: false,
  count: 1,
};

export const hex = createSlice({
  name: "hex",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setData: (state, action: PayloadAction<dataSchema>) => {
      state.data = action.payload;
    },
    setPrint: (state, action: PayloadAction<print>) => {
      state.print = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const { setData, setPrint, setCount } = hex.actions;

export default hex.reducer;
