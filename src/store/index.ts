import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import purchaseReducer from "../slices/purchaseOrders";

export const store = configureStore({
  reducer: {
    purchase: purchaseReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
