import { createFileRoute } from "@tanstack/react-router";
import AddPrefix from "../../pages/AddPrefix";
import { authGuard } from "../../utils/auth";

export const Route = createFileRoute("/prefix/add")({
  beforeLoad: () => authGuard("prefix-add"),
  component: AddPrefix,
});
