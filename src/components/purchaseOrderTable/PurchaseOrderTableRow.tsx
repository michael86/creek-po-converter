import { useState } from "react";

import TableRow from "@mui/material/TableRow";
import ShowItemHistoryButton from "./ShowItemHistoryButton";
import RowCells from "./RowCells";
import HistoryRow from "./HistoryRow";
import AddDeliveryButton from "./AddDeliveryButton";

import { useAppSelector } from "../../store";

import { createCellData } from "../../utils/table";
import { hasItems } from "../../utils/typeGuards";

import { Deliveries, Item } from "../../types/state/purchaseOrders";
import { useLabelManager } from "../../hooks/useLabelManager";

type Props = {
  row: Item;
};

export const PurchaseOrderTableRow: React.FC<Props> = ({ row }) => {
  const editMode = useAppSelector((state) => state.purchaseOrder.editMode);
  const { handleLabelsChange } = useLabelManager();
  const [open, setOpen] = useState(false);
  const [deliveries, setDeliveries] = useState<Deliveries>(
    row.deliveries || []
  );

  const data = createCellData(row);

  const handleDelete = (id: string) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.filter((delivery) => delivery.id !== id)
    );
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <ShowItemHistoryButton
          open={open}
          setOpen={setOpen}
          disabled={!hasItems(deliveries)}
        />

        <RowCells data={data} />

        {editMode && <AddDeliveryButton row={row} />}
      </TableRow>
      {hasItems(deliveries) && (
        <HistoryRow
          history={deliveries}
          open={open}
          handleLabelsChange={handleLabelsChange}
          description={row.description}
          partNumber={row.partNumber}
          location={row.storageLocation || null}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default PurchaseOrderTableRow;
