import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  role: number;
}

const initialState: InitialState = {
  role: 0, //list of purchase orders available
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setRole: (state, action: PayloadAction<number>) => {
      state.role = action.payload;
    },
  },
});

export const { setRole } = userSlice.actions;

export default userSlice.reducer;
