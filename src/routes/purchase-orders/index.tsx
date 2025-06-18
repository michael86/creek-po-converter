import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import FetchingLoader from "../../components/FetchingLoader";
import PurchaseOrder from "../../pages/purchaseOrder";
import { checkAuth, validateRole } from "../../utils/auth";

export const Route = createFileRoute("/purchase-orders/")({
  beforeLoad: async () => {
    await checkAuth();
    await validateRole();
  },
  component: () => (
    <Suspense fallback={<FetchingLoader />}>
      <PurchaseOrder />
    </Suspense>
  ),
});
