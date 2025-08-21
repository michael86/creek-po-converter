import { createFileRoute } from "@tanstack/react-router";
import Propelair from "../pages/propelair";
import { checkAuth } from "../utils/auth";

export const Route = createFileRoute("/propelair")({
  beforeLoad: checkAuth,
  component: Propelair,
});
