import React, { SetStateAction, useRef } from "react";
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

import { dataSchema, setHexCount, setHexData, setHexPrint, setHexRadio } from "../slices/hex";
import { useAppDispatch, useAppSelector } from "../hooks";
import { manageConversion } from "../utils";

const GenerateHex: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, radio } = useAppSelector((state) => state.hex);
  const startRef = useRef<HTMLDivElement>(null);
  const amountRef = useRef<HTMLDivElement>(null);

  const dispatchHexData = () => {
    if (!startRef.current || !amountRef.current) return;

    const inputElement = startRef.current.children[0] as HTMLInputElement;
    const amountElement = amountRef.current.children[0] as HTMLInputElement;

    if (!radio && isNaN(+inputElement.value)) return;

    dispatch(setHexData(manageConversion(inputElement.value, +amountElement.value) as dataSchema));
  };

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
            ref={startRef}
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
            ref={amountRef}
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
          <Button variant="contained" onClick={() => dispatchHexData()}>
            Generate
          </Button>

          {data.length > 0 && (
            <Button variant="contained" onClick={() => dispatch(setHexPrint(true))}>
              Print
            </Button>
          )}
        </div>
      </form>
      {data && data.length > 0 && (
        <section className="data-table">
          <HexTable />
        </section>
      )}
    </>
  );
};

export default GenerateHex;
