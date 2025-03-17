import { configureStore } from "@reduxjs/toolkit";
import { authReducer, logout } from "./slices/authSlice";
import { setLogoutHandler } from "../api";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

// Register the logoutHandler after the store is initilized,
// this allows axios inteceptor to access the logout reducer in the auth slice
setLogoutHandler(() => store.dispatch(logout()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
