import { TableBody as Tbody } from "@mui/material";
import PurchaseOrderTableRow from "./PurchaseOrderTableRow";
import { useAppSelector } from "../../store";

const TableBody = () => {
  const items = useAppSelector((state) => state.purchaseOrder.items);

  if (!items) return;

  return (
    <Tbody>
      {items.map((row, index) => (
        <PurchaseOrderTableRow key={`${row.partNumber}-${index}`} row={row} />
      ))}
    </Tbody>
  );
};

export default TableBody;
