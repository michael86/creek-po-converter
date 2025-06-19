import { useState } from "react";

import TableRow from "@mui/material/TableRow";
import ShowItemHistoryButton from "./ShowItemHistoryButton";
import RowCells from "./RowCells";
import HistoryRow from "./HistoryRow";
import AddDeliveryButton from "./AddDeliveryButton";

import { useAppSelector } from "../../store";

import { createCellData } from "../../utils/table";
import { hasItems } from "../../utils/typeGuards";

import { Item } from "../../types/state/purchaseOrders";
import { useLabelManager } from "../../hooks/useLabelManager";

type Props = {
  row: Item;
};

export const PurchaseOrderTableRow: React.FC<Props> = ({ row }) => {
  const { editMode } = useAppSelector((state) => state.purchaseOrder);
  // const { handleLabelsChange } = useLabelManager();
  const [open, setOpen] = useState(false);

  const data = createCellData(row);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <ShowItemHistoryButton
          open={open}
          setOpen={setOpen}
          disabled={row.deliveries?.length === 0}
        />

        <RowCells data={data} />

        {editMode && <AddDeliveryButton row={row} />}
      </TableRow>
      {/* {hasItems(row.deliveries) && (
        <HistoryRow history={row.deliveries} open={open} handleLabelsChange={handleLabelsChange} />
      )} */}
    </>
  );
};

export default PurchaseOrderTableRow;
