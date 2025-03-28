import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import api from "../../api";
import { checkAuth } from "../../utils/auth";
import { FetchCompletePurchaseOrder } from "../../types/api";

export const Route = createFileRoute("/purchase-orders/$uuid")({
  beforeLoad: checkAuth,
  loader: async ({ params }) => {
    console.log(params.uuid);
    const { data } = await api.get<FetchCompletePurchaseOrder>(`purchase-order/${params.uuid}`);

    return data;
  },
  component: PostComponent,
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
});

function PostComponent() {
  const { data } = useLoaderData({ from: "/purchase-orders/$uuid" });
  return <div>Post {JSON.stringify(data)}</div>;
}
