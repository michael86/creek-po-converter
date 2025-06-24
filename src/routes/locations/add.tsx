import { createFileRoute } from "@tanstack/react-router";
import AddLocation from "../../pages/AddLocation";
import { authGuard } from "../../utils/auth";

export const Route = createFileRoute("/locations/add")({
  beforeLoad: () => authGuard("locations-add"),
  component: AddLocation,
});
