import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkAuth } from "../utils/auth";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const res = await checkAuth();
    if (res) {
      redirect({ to: res.to, throw: true });
      return;
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard"!</div>;
}
