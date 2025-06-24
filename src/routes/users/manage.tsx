import { createFileRoute } from "@tanstack/react-router";
import { authGuard } from "../../utils/auth";
import ManageUsers from "../../pages/ManageUsers";

export const Route = createFileRoute("/users/manage")({
  beforeLoad: () => authGuard("manage-users"),
  component: ManageUsers,
});
