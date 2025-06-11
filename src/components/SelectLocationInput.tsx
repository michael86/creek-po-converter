import { FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { getLocations } from "../api/queries/getLocations";
import FetchingLoader from "./FetchingLoader";
import { FC, useState } from "react";
import SnackBar from "./SnackBar";
import api from "../api";
import { useEffect } from "react";
type Props = {
  itemId: number;
  itemName: string;
  refetch: () => void;
  currentLocation: string;
};

const SelectLocationInput: FC<Props> = ({ itemId, itemName, refetch, currentLocation }) => {
  const data = getLocations();
  const [value, setValue] = useState<string>(currentLocation);
  const [showSnack, setShowSnack] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      await api.post("/locations/update", {
        itemName,
        location: event.target.value,
      });

      await refetch();
      setValue(event.target.value);
      setShowSnack(true);
    } catch (error) {
      console.error("Error updating lcoation\n", error);
      setError("Error updating location, please contact Michael");
    }
  };

  useEffect(() => {
    setValue(currentLocation || "");
  }, [currentLocation]);

  return (
    <FormControl fullWidth>
      <Select
        labelId="select-location"
        id={`select-location-input-${itemId}`}
        value={value}
        label="location"
        onChange={handleChange}
        disabled={!!error}
        displayEmpty
      >
        <MenuItem disabled value="">
          <em>Select Location</em>
        </MenuItem>

        {data.map((val) => {
          return (
            <MenuItem key={`option-${itemId}-${val.id}`} value={val.name}>
              {error ? error : val.name}
            </MenuItem>
          );
        })}
      </Select>
      {showSnack && <SnackBar setShowSnack={setShowSnack} message="Location Updated" />}
    </FormControl>
  );
};

export default SelectLocationInput;
