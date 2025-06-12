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
import PurchaseOrderEditButtons from "../PurchaseOrderEditButtons";
import { setItems, setName, setRef } from "../../store/slices/purchaseOrder";
import DeliveryModal from "../deliveryModal";
import { Items } from "../../types/state/purchaseOrders";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

const PurchaseOrderTable = () => {
  const uuid = useAppSelector((state) => state.purchaseOrder.uuid) as string; // Cast as string, this component will not render if null
  const role = useAppSelector((state) => state.auth.role) || 1;
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEdit] = useState(false);
  const [modalRow, setModalRow] = useState<Items | null>(null);

  const { data, isLoading, isError, refetch } = useQuery<FetchCompletePurchaseOrder>({
    queryKey: ["fetch-po", uuid],
    queryFn: () => fetchPo(uuid),
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
          <TableHead editMode={editMode} />

          <TableBody
            items={data.data.items}
            setModalRow={setModalRow}
            setShowModal={setShowModal}
            editMode={editMode}
            refetch={refetch}
          />
        </Table>
      </TableContainer>
      {showModal && modalRow && <DeliveryModal setShowModal={setShowModal} row={modalRow} />}

      {role >= 3 && <PurchaseOrderEditButtons setEdit={setEdit} />}
    </>
  );
};

export default PurchaseOrderTable;
