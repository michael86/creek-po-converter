import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type dataSchema = { hex: string; decimal: number }[];
type print = boolean;

type InitState = {
  data: dataSchema;
  print: print;
  count: number;
  radio: 1 | 0;
};

const initialState: InitState = {
  data: [],
  print: false,
  count: 1,
  radio: 0,
};

export const hex = createSlice({
  name: "hex",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setHexData: (state, action: PayloadAction<dataSchema>) => {
      state.data = action.payload;
    },
    setHexPrint: (state, action: PayloadAction<print>) => {
      state.print = action.payload;
    },
    setHexCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setHexRadio: (state, action: PayloadAction<0 | 1>) => {
      state.radio = action.payload;
    },
  },
});

export const { setHexData, setHexPrint, setHexCount, setHexRadio } = hex.actions;

export default hex.reducer;
