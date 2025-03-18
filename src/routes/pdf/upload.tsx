import { createFileRoute } from "@tanstack/react-router";
import { checkAuth } from "../../utils/auth";
import PdfUpload from "../../pages/pdf/Upload";

export const Route = createFileRoute("/pdf/upload")({
  beforeLoad: checkAuth,
  component: PdfUpload,
});
