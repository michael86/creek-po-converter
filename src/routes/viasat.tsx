import { createFileRoute } from "@tanstack/react-router";
import Viasat from "../pages/Viasat";
import { authGuard } from "../utils/auth";

export const Route = createFileRoute("/viasat")({
  beforeLoad: () => authGuard("viasat"),
  component: Viasat,
});
