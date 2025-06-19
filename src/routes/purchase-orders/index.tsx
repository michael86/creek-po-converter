import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import FetchingLoader from "../../components/FetchingLoader";
import PurchaseOrder from "../../pages/purchaseOrder";
import { authGuard } from "../../utils/auth";

export const Route = createFileRoute("/purchase-orders/")({
  beforeLoad: authGuard,
  component: () => (
    <Suspense fallback={<FetchingLoader />}>
      <PurchaseOrder />
    </Suspense>
  ),
});
