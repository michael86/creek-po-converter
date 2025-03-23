import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import FetchingLoader from "../components/FetchingLoader";
import PurchaseOrder from "../pages/purchaseOrder";

export const Route = createFileRoute("/purchase-orders")({
  component: () => (
    <Suspense fallback={<FetchingLoader />}>
      <PurchaseOrder />
    </Suspense>
  ),
});
