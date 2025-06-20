import { TableBody as Tbody } from "@mui/material";
import PurchaseOrderTableRow from "./PurchaseOrderTableRow";
import { useAppSelector } from "../../store";

const TableBody = () => {
  const items = useAppSelector((state) => state.purchaseOrder.items);

  if (!items) return;

  return (
    <Tbody>
      {Object.entries(items).map(([_, item]) => (
        <PurchaseOrderTableRow key={item.id} row={item} />
      ))}
    </Tbody>
  );
};

export default TableBody;
