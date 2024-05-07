import { Typography, Input, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { getDate } from "../utils";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { PartNumber, setPartNumbers } from "../slices/purchaseOrders";
import axios from "../utils/interceptors";
import { setToast } from "../slices/alert";

type Props = {
  name?: string;
  description?: string;
  quantity?: number;
  dateCreated?: number;
  lastEdited?: number;

  dateDue?: number;
  lineId?: number;
  onNewRowDelete?: () => void;
};

type State = { name?: string; description?: string; quantity?: number; dateDue?: string };

const REGEX = /^[0-9]*$/;

const EditPoRow: React.FC<Props> = ({
  name,
  description,
  quantity,
  lastEdited,
  dateDue,
  onNewRowDelete,
  lineId,
}) => {
  const [state, setState] = useState<State>({
    name,
    description,
    quantity,
    dateDue: getDate(dateDue, true),
  });
  const { order } = useAppSelector((state) => state.purchase);
  const dispatch = useAppDispatch();

  const onInput = (key: string, value: string) => {
    if (key === "quantity" && !REGEX.test(value)) {
      return;
    }

    setState({ ...state, [key]: value });
  };

  const onSave = async () => {
    if (!lineId || !order) return;
    const { partNumbers } = order;
    const storeState = partNumbers.find((entry) => entry.lineId === lineId);
    if (!storeState) return;
    const { totalOrdered, description, dateDue } = storeState;

    const updates: { count?: number; description?: string; dateDue?: string } = {};
    if (totalOrdered !== state.quantity) updates.count = state.quantity;
    if (description !== state.description) updates.description = state.description;
    if (getDate(dateDue, true) !== state.dateDue) updates.dateDue = state.dateDue;

    if (Object.keys(updates).length > 0) {
      const res = await axios.post("/purchase/update", { ...updates, lineId });
      if (res.status !== 200)
        return dispatch(setToast({ type: "error", message: "Failed to update date", show: true }));

      dispatch(setToast({ type: "success", message: "Date due updated", show: true }));
    }
  };

  const onDelete = async () => {
    if (!lineId || !order) {
      onNewRowDelete && onNewRowDelete();
      return;
    }

    const res = await axios.post("/purchase/delete", { lineId });
    if (res.status !== 200) {
      return dispatch(
        setToast({ type: "error", message: "Failed to delete part, contact michael", show: true })
      );
    }

    const { partNumbers } = order;
    const copy = structuredClone(partNumbers);
    copy.splice(
      copy.findIndex((entry: PartNumber) => entry.lineId === lineId),
      1
    );
    dispatch(setPartNumbers(copy));
    dispatch(setToast({ type: "success", message: "Part deleted", show: true }));
  };

  return (
    <tr>
      <td>
        {name ? (
          <Typography variant="subtitle2">{name}</Typography>
        ) : (
          <Input
            type="text"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => onInput("name", e.target.value)}
            value={state.name}
          />
        )}
      </td>

      <td>
        {/* <Input
          type="text"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            onInput("description", e.target.value)
          }
          value={state.description}
        /> */}
        <Typography>{state.description}</Typography>
      </td>

      <td>
        {/* <Input
          type="text"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => onInput("quantity", e.target.value)}
          value={state.quantity}
        /> */}
        <Typography>{state.quantity}</Typography>
      </td>

      <td>
        <Input
          type="date"
          value={state.dateDue}
          onChange={(e) => setState({ ...state, dateDue: e.target.value })}
        />
      </td>

      <td>
        <Typography variant="subtitle2">
          {lastEdited ? getDate(lastEdited) : "Not edited before"}
        </Typography>
      </td>

      <td>
        <Button variant="contained" endIcon={<SaveIcon />} onClick={onSave}>
          save
        </Button>
        <Button variant="contained" endIcon={<DeleteIcon />} onClick={onDelete}>
          delete
        </Button>
      </td>
    </tr>
  );
};

export default EditPoRow;
