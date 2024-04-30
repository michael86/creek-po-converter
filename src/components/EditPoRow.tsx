import { Typography, Input, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { getDate } from "../utils";

type Props = {
  name?: string;
  description?: string;
  totalOrdered?: number;
  dateCreated?: number;
  lastEdited?: number;
  newRowIndex?: number;
};

const EditPoRow: React.FC<Props> = ({
  name,
  description,
  totalOrdered,
  lastEdited,
  newRowIndex,
}) => {
  return (
    <tr>
      <td>{name ? <Typography variant="subtitle2">{name}</Typography> : <Input type="text" />}</td>

      <td>
        <Input type="text" value={description} />
      </td>

      <td>
        <Input type="text" value={totalOrdered} />
      </td>

      <td>
        <Typography variant="subtitle2">
          {lastEdited ? getDate(lastEdited) : "Not edited before"}
        </Typography>
      </td>

      <td>
        <Button variant="contained" endIcon={<SaveIcon />}>
          save
        </Button>
        <Button variant="contained" endIcon={<DeleteIcon />}>
          delete
        </Button>
      </td>
    </tr>
  );
};

export default EditPoRow;
