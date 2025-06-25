import { createFileRoute } from "@tanstack/react-router";
import DispatchLabels from "../pages/dispatchLabels";

export const Route = createFileRoute("/dispatch-labels")({
  component: DispatchLabels,
});
