import { createFileRoute } from "@tanstack/react-router";
import { checkAuth } from "../utils/auth";
import Dashboard from "../pages/Dashboard";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: checkAuth,
  component: Dashboard,
});
