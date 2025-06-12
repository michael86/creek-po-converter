import { useQuery } from "@tanstack/react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Row from "./PurchaseOrderTableRow";
import { createData } from "../utils/table";
import { fetchPo } from "../api/queries/getPurchaseOrderDetails";
import { useAppDispatch, useAppSelector } from "../store";
import FetchingLoader from "./FetchingLoader";
import { Typography } from "@mui/material";
import { FetchCompletePurchaseOrder } from "../types/api";
import { useEffect, useState } from "react";
import PurchaseOrderEditButtons from "./PurchaseOrderEditButtons";
import { setItems, setName, setRef } from "../store/slices/purchaseOrder";

const PurchaseOrderTable = () => {
  const uuid = useAppSelector((state) => state.purchaseOrder.uuid) as string; // Cast as string, this component will not render if null
  const role = useAppSelector((state) => state.auth.role) || 1;
  const dispatch = useAppDispatch();

  const [editMode, setEdit] = useState(false);

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

  const items = data.data.items;

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Part Number</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Quantity Received</TableCell>
              <TableCell align="right">Storage Location</TableCell>
              <TableCell align="right">Due Date</TableCell>
              {editMode && <TableCell align="right">Add Delivery</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              items.map((row, index) => (
                <Row
                  key={`${row.partNumber}-${index}`}
                  row={createData(row)}
                  editMode={editMode}
                  refetch={refetch}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {role >= 3 && <PurchaseOrderEditButtons setEdit={setEdit} />}
    </>
  );
};

export default PurchaseOrderTable;
