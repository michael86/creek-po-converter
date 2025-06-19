import { FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { getLocations } from "../../api/queries/getLocations";
import FetchingLoader from "../FetchingLoader";
import { FC, useState } from "react";
import SnackBar from "../SnackBar";
import api from "../../api";
import { useEffect } from "react";
import { useUpdateLocation } from "../../api/queries/useUpdateLocation";

type Props = {
  itemId: string;
  itemName: string;
  currentLocation: string;
};

const SelectLocationInput: FC<Props> = ({ itemId, itemName, currentLocation }) => {
  const data = getLocations();
  const [value, setValue] = useState<string>(currentLocation);
  const [showSnack, setShowSnack] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync } = useUpdateLocation();

  useEffect(() => {
    setValue(currentLocation || "");
  }, [currentLocation]);

  //Turn this into a mutation function
  const handleChange = async (event: SelectChangeEvent) => {
    try {
      const { value: location } = event.target;

      await mutateAsync({ itemName, location });

      setValue(event.target.value);
      setShowSnack(true);
    } catch (error) {
      console.error("Error updating lcoation\n", error);
      setError("Error updating location, please contact Michael");
    }
  };

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
