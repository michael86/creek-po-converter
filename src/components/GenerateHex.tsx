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
import { useAppDispatch, useAppSelector } from "../hooks";
import { setHexCount, setHexData, setHexPrint, setHexRadio } from "../slices/hex";

type Props = {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
};

const GenerateHex: React.FC<Props> = ({ value, setValue }) => {
  const { data, radio } = useAppSelector((state) => state.hex);
  const dispatch = useAppDispatch();

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
            onChange={(e) => dispatch(setHexCount(+e.target.value))}
          />
        </InputLabel>

        <FormControl>
          <RadioGroup
            defaultValue="decimal"
            name="radio-buttons-group"
            onChange={(e) => dispatch(setHexRadio(e.target.value ? 1 : 0))}
          >
            <FormControlLabel value="decimal" control={<Radio />} label="decimal" />
            <FormControlLabel value="hex" control={<Radio />} label="hex" />
          </RadioGroup>
        </FormControl>

        <div className="button-container">
          {/* <Button variant="contained" onClick={() => manageConversion()}>
                Generate
              </Button> */}

          {data.length > 0 && (
            <Button variant="contained" onClick={() => dispatch(setHexPrint(true))}>
              Print
            </Button>
          )}
        </div>
      </form>
      {data && data.length > 0 && (
        <section className="data-table">
          <HexTable data={data} />
        </section>
      )}
      );
    </>
  );
};

export default GenerateHex;
