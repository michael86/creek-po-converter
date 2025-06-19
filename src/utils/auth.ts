import api from "../api";
import { store } from "../store";
import { login, logout } from "../store/slices/authSlice";
import { queryClient } from "../lib/reactQueryClient";
import { AuthMe, ValidateRole } from "../types/api";
import { redirect } from "@tanstack/react-router";
import router from "../lib/reactRouter";

export const checkAuth = async () => {
  try {
    const { data } = await queryClient.fetchQuery<{ data: AuthMe }>({
      queryKey: ["authUser"],
      queryFn: async () => {
        const response = await api.get("/auth/me", { withCredentials: true });
        return response.data;
      },
      staleTime: 1000 * 60 * 10, // 10 minutes
      retry: false, // Avoid retrying the request automatically
    });

    if (!data) throw new Error("User not authenticated");

    store.dispatch(login({ name: data.name, email: data.email, role: data.role }));
  } catch (error) {
    store.dispatch(logout());

    throw redirect({ to: "/", throw: true });
  }
};

export const validateRole = async () => {
  try {
    const { data } = await queryClient.fetchQuery<{ data: ValidateRole }>({
      queryKey: ["authRole"],
      queryFn: async () => {
        const response = await api.get("/auth/role", { withCredentials: true });
        return response;
      },
    });
    if (!data || !data.status || data.status === "Error")
      throw new Error("User attempted to access a forbidden route");

    return data.status;
  } catch (error) {
    router.navigate({ to: "/dashboard" });
    console.error(error);
  }
};

export const authGuard = async () => {
  await checkAuth();
  await validateRole();
};
