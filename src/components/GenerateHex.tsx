import React, { SetStateAction } from "react";
import HexTable from "./HexTable";
import {
  InputLabel,
  Input,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Button,
  Radio,
} from "@mui/material";

type Props = {
  data: { hex: string; decimal: number }[];
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  setCount: React.Dispatch<SetStateAction<number>>;
  setRadioValue: React.Dispatch<SetStateAction<string>>;
  setData: React.Dispatch<SetStateAction<{ hex: string; decimal: number }[]>>;
  radio: 1 | 0;
};

const GenerateHex: React.FC<Props> = ({
  data,
  value,
  setValue,
  setCount,
  setRadioValue,
  setData,
  radio,
}) => {
  //     const manageConversion = () => {
  //     if (!radio && isNaN(+value)) return;

  //     let valueRef = !radio ? +value : value;
  //     const newData: {hex: string, decimal: number}[] = [];

  //     for (let i = 0; i <= count; i++) {
  //       typeof valueRef === "string"
  //         ? newData.push({ hex: valueRef.toUpperCase(), decimal: convertToDec(valueRef) })
  //         : newData.push({ hex: convertToHex(valueRef).toUpperCase(), decimal: valueRef });

  //       if (typeof valueRef === "number") {
  //         valueRef++;
  //       } else if (typeof valueRef === "string") {
  //         valueRef = parseInt(valueRef, 16);
  //         valueRef++;
  //         valueRef = valueRef.toString(16);
  //       }
  //     }

  //     setData(newData);
  //   };

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
            value={value || ""}
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
          {/* <Button variant="contained" onClick={() => manageConversion()}>
                Generate
              </Button> */}

          {/* {data && data.length > 0 && (
                  <Button variant="contained" onClick={() => setPrint(true)}>
                  Print
                </Button>
              )} */}
        </div>
      </form>
      {data && data.length > 0 && (
        <section className="data-table">
          <HexTable data={data} />
        </section>
      )}{" "}
      );
    </>
  );
};

export default GenerateHex;
