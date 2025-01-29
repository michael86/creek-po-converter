import {
  Input,
  Button,
  InputLabel,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
} from "@mui/material";

import "../styles/create_hex.css";
import { useState } from "react";

const convertToHex = (number: number) => number.toString(16);
const convertToDec = (number: string) => parseInt(number, 16);

const CreateHexSticker = () => {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);
  const [radio, setRadio] = useState(0);

  const manageConversion = () => {
    console.log("start value ", !radio ? convertToHex(+value) : convertToDec(value));
  };

  const setRadioValue = (value: string) => setRadio(value.toLowerCase() === "decimal" ? 0 : 1);

  return (
    <>
      <h1 className="hex-title">Create Hex</h1>

      <form className="hex-form">
        <InputLabel>
          Start Count:
          <Input
            color="primary"
            margin="dense"
            name="start-count"
            required
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value.toUpperCase())}
          />
        </InputLabel>

        <InputLabel>
          Amount Required:
          <Input
            color="primary"
            name="count-amount"
            required
            type="number"
            value={count}
            onChange={(e) => setCount(+e.target.value)}
          />
        </InputLabel>

        <FormControl>
          <RadioGroup
            defaultValue="decimal"
            name="radio-buttons-group"
            onChange={(e) => setRadioValue(e.target.value)}
          >
            <FormControlLabel value="decimal" control={<Radio />} label="decimal" />
            <FormControlLabel value="hex" control={<Radio />} label="hex" />
          </RadioGroup>
        </FormControl>

        <div className="button-container">
          <Button variant="contained" onClick={() => manageConversion()}>
            Generate
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateHexSticker;
