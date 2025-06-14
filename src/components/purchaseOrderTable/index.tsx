import { useQuery } from "@tanstack/react-query";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { fetchPo } from "../../api/queries/getPurchaseOrderDetails";
import { useAppDispatch, useAppSelector } from "../../store";
import FetchingLoader from "../FetchingLoader";
import { Typography } from "@mui/material";
import { FetchCompletePurchaseOrder } from "../../types/api";
import { useEffect, useState } from "react";

import { setItems, setName, setRef } from "../../store/slices/purchaseOrder";
import DeliveryModal from "../deliveryModal";
import { Items } from "../../types/state/purchaseOrders";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

const PurchaseOrderTable = () => {
  const purchaseOrder = useAppSelector((state) => state.purchaseOrder); // Cast as string, this component will not render if null

  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);
  const [modalRow, setModalRow] = useState<Items | null>(null);

  const { data, isLoading, isError, refetch } = useQuery<FetchCompletePurchaseOrder>({
    queryKey: ["fetch-po", purchaseOrder.uuid],
    queryFn: () => fetchPo(purchaseOrder.uuid!),
  });

  useEffect(() => {
    if (data?.data.items && data?.data.orderRef && data?.data.poNumber) {
      dispatch(setItems(data.data.items));
      dispatch(setName(data.data.poNumber));
      dispatch(setRef(data.data.orderRef));
    }
  }, [data, dispatch]);

  if (isLoading) return <FetchingLoader />;
  if (isError || !data)
    return (
      <Typography variant="body1" color="red">
        Error loading data
      </Typography>
    );

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead editMode={purchaseOrder.editMode} />

          <TableBody
            items={data.data.items}
            setModalRow={setModalRow}
            setShowModal={setShowModal}
            editMode={purchaseOrder.editMode}
            refetch={refetch}
          />
        </Table>
      </TableContainer>

      {showModal && modalRow && (
        <DeliveryModal
          poName={data.data.poNumber}
          setShowModal={setShowModal}
          row={modalRow}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default PurchaseOrderTable;
