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
import SnackBar from "./SnackBar";
import api from "../api";
import { useAppSelector } from "../store";

type Props = {
  itemId: number;
};

const SelectLocationInput: FC<Props> = ({ itemId }) => {
  const data = getLocations();
  const [value, setValue] = useState<string>("");
  const [showSnack, setShowSnack] = useState<boolean>(false);
  const purchaseOrder = useAppSelector((state) => state.purchaseOrder);

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

  const handleChange = async (event: SelectChangeEvent) => {
    try {
      console.log("event target value ", event.target.value);

      const updated = await api.post("/locations/update", {
        itemId,
      });
    } catch (error) {}

    setValue(event.target.value);
    setShowSnack(true);
  };

  return (
    <FormControl fullWidth>
      <Select
        labelId="select-location"
        id={`select-location-input-${itemId}`}
        value={value}
        label="location"
        color="black"
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
      {showSnack && <SnackBar setShowSnack={setShowSnack} message="Location Updated" />}
    </FormControl>
  );
};

export default SelectLocationInput;
