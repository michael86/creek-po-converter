import api from "../api";
import { store } from "../store";
import { logout } from "../store/slices/authSlice";
import { queryClient } from "../lib/reactQueryClient";

export const checkAuth = async () => {
  try {
    const data = await queryClient.fetchQuery({
      queryKey: ["authUser"],
      queryFn: async () => {
        const response = await api.get("/auth/me", { withCredentials: true });
        return response.data;
      },
      staleTime: 1000 * 60 * 10, // 10 minutes
      retry: false, // Avoid retrying the request automatically
    });

    if (!data) throw new Error("User not authenticated");
  } catch (error) {
    console.error("Auth check failed:", error);

    store.dispatch(logout());

    return { to: "/" };
  }
};
