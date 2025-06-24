import { createFileRoute } from "@tanstack/react-router";
import HexStickers from "../pages/HexStickers";
import { authGuard } from "../utils/auth";

export const Route = createFileRoute("/hex-stickers")({
  beforeLoad: () => authGuard("hex-stickers"),
  component: HexStickers,
});
