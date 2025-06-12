import { TableBody as Tbody } from "@mui/material";
import Row from "../PurchaseOrderTableRow";
import { Items } from "../../types/state/purchaseOrders";
import { createData } from "../../utils/table";

type Props = {
  items: Items[];
  editMode: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalRow: React.Dispatch<React.SetStateAction<Items | null>>;
  refetch: () => void;
};

const TableBody: React.FC<Props> = ({ items, editMode, setShowModal, setModalRow, refetch }) => {
  return (
    <Tbody>
      {items.map((row, index) => (
        <Row
          key={`${row.partNumber}-${index}`}
          row={createData(row)}
          editMode={editMode}
          refetch={refetch}
          onShowModal={() => {
            setShowModal(true);
            setModalRow(row);
          }}
        />
      ))}
    </Tbody>
  );
};

export default TableBody;
