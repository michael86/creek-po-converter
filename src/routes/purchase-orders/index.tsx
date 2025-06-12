import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import FetchingLoader from "../../components/FetchingLoader";
import PurchaseOrder from "../../pages/purchaseOrder";
import { checkAuth } from "../../utils/auth";

export const Route = createFileRoute("/purchase-orders/")({
  beforeLoad: checkAuth,
  component: () => (
    <Suspense fallback={<FetchingLoader />}>
      <PurchaseOrder />
    </Suspense>
  ),
});
