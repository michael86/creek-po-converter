import { createFileRoute } from "@tanstack/react-router";
import { checkAuth } from "../../utils/auth";

export const Route = createFileRoute("/pdf/upload")({
  beforeLoad: checkAuth,
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/pdf/upload"!</div>;
}
