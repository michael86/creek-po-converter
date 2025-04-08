import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { getLocations } from "../api/queries/getLocations";
import FetchingLoader from "./FetchingLoader";

const SelectLocationInput = () => {
  const data = getLocations();

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
      <InputLabel id="select-location">location</InputLabel>
      <Select
        labelId="select-location"
        // id={`select-location-${}`} - need to return the uuid from ther backend as part of the data so we can set a unique html id here
        // value={age}
        label="Age"
        // onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectLocationInput;
