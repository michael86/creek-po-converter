import { createFileRoute } from "@tanstack/react-router";
import AddPrefix from "../../pages/AddPrefix";

export const Route = createFileRoute("/prefix/add")({
  component: AddPrefix,
});
