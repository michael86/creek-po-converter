import api from "../api";
import { store } from "../store";
import { login, logout } from "../store/slices/authSlice";
import { queryClient } from "../lib/reactQueryClient";
import { AuthMe } from "../types/api";
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

    store.dispatch(
      login({ name: data.name, email: data.email, role: data.role })
    );
  } catch (error) {
    store.dispatch(logout());

    throw redirect({ to: "/", throw: true });
  }
};

export const validateRole = async (validateKey: string) => {
  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: ["authRole", validateKey],
      queryFn: async () => {
        const res = await api.get(`/auth/role/${validateKey}`, {
          withCredentials: true,
        });
        return res;
      },
    });

    if (!data?.status || data.status === "Error") {
      throw new Error("Access denied");
    }

    return true;
  } catch (err) {
    router.navigate({ to: "/dashboard" });
    console.error("Auth guard blocked access:", err);
    return false;
  }
};

export const authGuard = async (key: string) => {
  await checkAuth();
  await validateRole(key);
};
