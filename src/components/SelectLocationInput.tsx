import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { getLocations } from "../api/queries/getLocations";
import FetchingLoader from "./FetchingLoader";
import { FC, useState } from "react";
import toast from "react-hot-toast/headless";

type Props = {
  itemId: number;
};

const SelectLocationInput: FC<Props> = ({ itemId }) => {
  const data = getLocations();
  const [value, setValue] = useState<string>("");

  if (data === "loading") {
    return <FetchingLoader />;
  }

  if (data === "Error selecting locations, are you sure you added some") {
    return (
      <Typography variant="body1" color="red">
        {data}
      </Typography>
    );
  }

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    toast("location updated");
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-location">location</InputLabel>
      <Select
        labelId="select-location"
        id={`select-location-input-${itemId}`}
        value={value}
        label="Age"
        onChange={handleChange}
      >
        {data.map((val) => {
          return (
            <MenuItem key={`option-${itemId}-${val.id}`} value={val.id}>
              {val.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectLocationInput;
