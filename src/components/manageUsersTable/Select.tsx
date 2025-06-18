import { FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";

type Props = { value: string; handleChange: (role: string, id: number) => void; id: number };

const SelectInput: React.FC<Props> = ({ value, handleChange, id }) => {
  return (
    <FormControl>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Role"
        onChange={(e: SelectChangeEvent) => handleChange(e.target.value, id)}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectInput;
