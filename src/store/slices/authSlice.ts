import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api";

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  status: "idle",
  error: null,
};

export const authUser = createAsyncThunk("auth/validateMe", async (_, thunkAPI) => {
  try {
    const response = await api.get("auth/me");
    return response?.data ? response.data : null;
  } catch (error: unknown) {
    let errorMessage = "Failed to fetch auth data";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "object" && error !== null && "response" in error) {
      const axiosError = error as { response?: { data?: string } };
      errorMessage = axiosError.response?.data || errorMessage;
    }

    console.error("Error fetching auth data:", errorMessage);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
