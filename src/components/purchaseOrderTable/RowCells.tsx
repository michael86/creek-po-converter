import { TableCell } from "@mui/material";
import SelectLocationInput from "./SelectLocationInput";
import { useAppSelector } from "../../store";
import { CellData } from "../../types/state/purchaseOrders";

type Props = {
  data: CellData;
};

const RowCells: React.FC<Props> = ({ data }) => {
  const { editMode } = useAppSelector((state) => state.purchaseOrder);

  return (
    <>
      <TableCell component="th" scope="row">
        {data.partNumber}
      </TableCell>
      <TableCell align="right">{data.description}</TableCell>
      <TableCell align="right">{data.quantity}</TableCell>
      <TableCell align="right">{data.quantityReceived}</TableCell>
      <TableCell align="right">
        {editMode ? (
          <SelectLocationInput
            itemId={data.id}
            itemName={data.partNumber}
            currentLocation={data.storageLocation || ""}
          />
        ) : (
          data.storageLocation || "No location assigned"
        )}
      </TableCell>
      <TableCell align="right">{new Date(data.dueDate).toLocaleDateString()}</TableCell>
    </>
  );
};

export default RowCells;
