import { TableCell, Button } from "@mui/material";
import { useAppDispatch } from "../../store";
import { setSelectedItem } from "../../store/slices/purchaseOrder";
import { createModalData } from "../../utils/table";
import { setShowModal } from "../../store/slices/deliveryModal";
import { Item } from "../../types/state/purchaseOrders";

type Props = {
  row: Item;
};

const AddDeliveryButton: React.FC<Props> = ({ row }) => {
  const dispatch = useAppDispatch();

  return (
    <TableCell>
      <Button
        variant="contained"
        style={{ marginTop: "50%", transform: "translateY(-100%)" }}
        onClick={() => {
          dispatch(setSelectedItem(createModalData(row)));
          dispatch(setShowModal(true));
        }}
      >
        Add Delivery
      </Button>
    </TableCell>
  );
};

export default AddDeliveryButton;
