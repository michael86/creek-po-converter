import { createFileRoute } from "@tanstack/react-router";
import Auth from "../pages/Auth";

export const Route = createFileRoute("/login")({
  component: () => <Auth route="login" />,
});
