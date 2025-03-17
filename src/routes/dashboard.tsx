import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkAuth } from "../utils/auth";
import Dashboard from "../pages/dashboard";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const res = await checkAuth();
    if (res) {
      redirect({ to: res.to, throw: true });
      return;
    }
  },
  component: Dashboard,
});
