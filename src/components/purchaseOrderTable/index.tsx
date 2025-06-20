import { useQuery } from "@tanstack/react-query";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { fetchPo } from "../../api/queries/getPurchaseOrderDetails";
import { useAppDispatch, useAppSelector } from "../../store";
import FetchingLoader from "../FetchingLoader";
import { Typography } from "@mui/material";
import { FetchCompletePurchaseOrder } from "../../types/api";
import { useEffect } from "react";
import { setItems, setName, setRef } from "../../store/slices/purchaseOrder";
import DeliveryModal from "../deliveryModal";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { Items } from "../../types/state/purchaseOrders";

const PurchaseOrderTable = () => {
  const uuid = useAppSelector((state) => state.purchaseOrder.uuid);
  const showModal = useAppSelector((state) => state.deliveryModal.showModal);

  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useQuery<FetchCompletePurchaseOrder>({
    queryKey: ["fetch-po", uuid],
    queryFn: () => fetchPo(uuid!),
  });

  useEffect(() => {
    if (data?.data.items && data?.data.orderRef && data?.data.poNumber) {
      const items: Items = {};

      data.data.items.forEach((item) => {
        items[item.id] = { ...item };
      });

      dispatch(setItems(items));
      dispatch(setName(data.data.poNumber));
      dispatch(setRef(data.data.orderRef));
    }
  }, [data, dispatch]);

  return (
    <>
      {isLoading ? (
        <FetchingLoader />
      ) : isError || !data ? (
        <Typography variant="body1" color="red">
          Error loading data
        </Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead />
              <TableBody />
            </Table>
          </TableContainer>

          {showModal && data && <DeliveryModal poName={data.data.poNumber} />}
        </>
      )}
    </>
  );
};

export default PurchaseOrderTable;
