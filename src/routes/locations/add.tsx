import { createFileRoute } from "@tanstack/react-router";
import AddLocation from "../../pages/AddLocation";

export const Route = createFileRoute("/locations/add")({
  component: AddLocation,
});
