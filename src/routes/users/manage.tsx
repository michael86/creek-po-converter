import { createFileRoute } from "@tanstack/react-router";
import { checkAuth } from "../../utils/auth";
import ManageUsers from "../../pages/ManageUsers";

export const Route = createFileRoute("/users/manage")({
  beforeLoad: checkAuth,
  component: ManageUsers,
});
