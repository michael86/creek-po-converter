import { Typography, Input, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { getDate } from "../utils";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setPartNumbers } from "../slices/purchaseOrders";
import axios from "../utils/interceptors";

type Props = {
  name?: string;
  description?: string;
  quantity?: number;
  dateCreated?: number;
  lastEdited?: number;
  newRowIndex?: number;
  dateDue?: number;
};

type State = { name?: string; description?: string; quantity?: number; dateDue?: string };

const REGEX = /^[0-9]*$/;

const EditPoRow: React.FC<Props> = ({
  name,
  description,
  quantity,
  lastEdited,
  dateDue,
  newRowIndex,
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

  const onSave = () => {
    if (!order) return;
    // if (!name) return; //Will hand new rows here

    // const storeState = order.partNumbers[name];

    // const { totalOrdered, description } = storeState;

    // if (totalOrdered !== state.quantity) {
    //   console.log("total changed");
    // }
    // if (description !== state.description) {
    //   console.log("desc changed");
    // }
  };

  const onDelete = async () => {
    // if (!order || !name) return;
    // const { partNumbers } = order;
    // const copy = structuredClone(partNumbers);
    // delete copy[name];
    // //Call api here to remove partnumber
    // const res = await axios.post("/purchase/delete", { name, order: order.purchaseOrder });
    // dispatch(setPartNumbers(copy));
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
        <Input
          type="text"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            onInput("description", e.target.value)
          }
          value={state.description}
        />
      </td>

      <td>
        <Input
          type="text"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => onInput("quantity", e.target.value)}
          value={state.quantity}
        />
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
