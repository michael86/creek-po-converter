import { TableHead as Thead, TableRow, TableCell } from "@mui/material";
import { useAppSelector } from "../../store";

const TableHead = () => {
  const editMode = useAppSelector((state) => state.purchaseOrder.editMode);
  return (
    <Thead>
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
    </Thead>
  );
};

export default TableHead;
