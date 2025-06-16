import { FC, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { createData } from "../../utils/table";
import { Button } from "@mui/material";
import SelectLocationInput from "./SelectLocationInput";
import HistoryRow from "./HistoryRow";
import { hasItems } from "../../utils/typeGuards";
import { PurchaseOrderLabelsMap } from "../../types/labels";
import { useAppDispatch, useAppSelector } from "../../store";
import { setLabels } from "../../store/slices/purchaseOrder";

type Props = {
  row: ReturnType<typeof createData>;
  editMode: boolean;
  refetch: () => void;
  onShowModal: () => void;
};

export const Row: FC<Props> = ({ row, editMode, refetch, onShowModal }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const purchaseOrder = useAppSelector((state) => state.purchaseOrder);
  //Add a function to set all labels to checked

  const handleLabelsChange = (historyId: number) => {
    if (purchaseOrder.labels[row.name]?.[historyId]) {
      const newLabels = { ...purchaseOrder.labels };

      // If the label exists, we need to remove it
      const updatedHistoryMap = { ...newLabels[row.name] };
      delete updatedHistoryMap[historyId];

      // Replace the entry or delete the partNumber entirely if empty
      if (Object.keys(updatedHistoryMap).length === 0) {
        delete newLabels[row.name];
      } else {
        newLabels[row.name] = updatedHistoryMap;
      }

      dispatch(setLabels(newLabels));
      return;
    }

    if (!row.history || !row.history[historyId]) {
      console.error("Invalid historyId or row.history is undefined");
      return;
    }

    const newLabels: PurchaseOrderLabelsMap = {
      ...purchaseOrder.labels,
      [row.name]: {
        ...purchaseOrder.labels[row.name], // Ensure we are creating a new object for the row and spread previous labels if exists
        [historyId]: {
          purchaseOrder: purchaseOrder.name || "",
          dateReceived: row.history[historyId].dateReceived,
          quantityReceived: row.history[historyId].quantityReceived,
          description: row.description,
          partNumber: row.name,
          storageLocation: row.storageLocation || null,
        },
      },
    };
    dispatch(setLabels(newLabels));
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            disabled={row.history?.length === 0}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.description}</TableCell>
        <TableCell align="right">{row.quantity}</TableCell>
        <TableCell align="right">{row.quantityReceived}</TableCell>
        <TableCell align="right">
          {editMode ? (
            <SelectLocationInput
              itemId={row.id}
              itemName={row.name}
              refetch={refetch}
              currentLocation={row.storageLocation || ""}
            />
          ) : (
            row.storageLocation || "No location assigned"
          )}
        </TableCell>
        <TableCell align="right">{new Date(row.dueDate).toLocaleDateString()}</TableCell>

        {editMode && (
          <TableCell>
            <Button
              variant="contained"
              style={{ marginTop: "50%", transform: "translateY(-100%)" }}
              onClick={() => onShowModal()}
            >
              Add Delivery
            </Button>
          </TableCell>
        )}
      </TableRow>
      {hasItems(row.history) && (
        <HistoryRow history={row.history} open={open} handleLabelsChange={handleLabelsChange} />
      )}
    </>
  );
};

export default Row;
