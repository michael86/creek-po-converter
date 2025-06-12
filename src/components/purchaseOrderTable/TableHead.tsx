import { TableHead as Thead, TableRow, TableCell } from "@mui/material";
import React from "react";

type Props = {
  editMode: boolean;
};

const TableHead: React.FC<Props> = ({ editMode }) => {
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
