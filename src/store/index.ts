import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import purchaseReducer from "../slices/purchaseOrders";
import alertReducer from "../slices/alert";
import userReducer from "../slices/user";
import hexReducer from "../slices/hex";

export const store = configureStore({
  reducer: {
    purchase: purchaseReducer,
    alert: alertReducer,
    user: userReducer,
    hex: hexReducer,
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
