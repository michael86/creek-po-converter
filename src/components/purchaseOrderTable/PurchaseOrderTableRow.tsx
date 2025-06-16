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
import { PurchaseOrderLabels } from "../../types/labels";
import { useAppSelector } from "../../store";

type Props = {
  row: ReturnType<typeof createData>;
  editMode: boolean;
  refetch: () => void;
  onShowModal: () => void;
};

export const Row: FC<Props> = ({ row, editMode, refetch, onShowModal }) => {
  const [open, setOpen] = useState(false);
  const [labels, setLabels] = useState<Record<string, PurchaseOrderLabels>>({});
  const purchaseOrder = useAppSelector((state) => state.purchaseOrder.name);
  //Add a function to set all labels to checked

  const handleLabelsChange = (historyId: number) => {
    if (labels[historyId]) {
      const newLabels = { ...labels };
      delete newLabels[historyId];
      setLabels(newLabels);
      return;
    }

    if (!row.history || !row.history[historyId]) {
      console.error("Invalid historyId or row.history is undefined");
      return;
    }

    const newLabels = {
      ...labels,
      [historyId]: {
        purchaseOrder,
        ...row.history[historyId],
      },
    };
    setLabels(newLabels);
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
