import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import PurchaseOrderSelect from "../../components/purchaseOrderSelect";
import FetchingLoader from "../../components/FetchingLoader";

export const Route = createFileRoute("/pdf/")({
  component: () => (
    <Suspense fallback={<FetchingLoader />}>
      <PurchaseOrderSelect />
    </Suspense>
  ),
});
