import { createFileRoute } from "@tanstack/react-router";
import { authGuard } from "../../utils/auth";
import PdfUpload from "../../pages/pdf/Upload";

export const Route = createFileRoute("/pdf/upload")({
  beforeLoad: () => authGuard("pdf-upload"),
  component: PdfUpload,
});
