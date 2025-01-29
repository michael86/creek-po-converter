import { useState } from "react";
import { Template, BLANK_PDF } from "@pdfme/common";
import { generate } from "@pdfme/generator";

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
import HexTable from "../components/HexTable";

const convertToHex = (number: number) => number.toString(16);
const convertToDec = (number: string) => parseInt(number, 16);

const testPDF = () => {
  const fontSize: number = 6;
  const labelWidth: number = 16;
  const labelHeight: number = 4;
  const sheetHeight: number = 297;
  const sheetWidth: number = 210;
  const sheetCols: number = 10;
  const sheetRows: number = 36;

  const template: Template = {
    basePdf: BLANK_PDF,

    /**
     * Schema is going to be our label positions assumed 
     * the name is going to be used for the inputs to know where to put our label.
     * Need to addjust the margin top and so on...
     * 
     * Template details: 
     * top margin: 6
     * sid margin: 8
     * vertical pitch: 8 - Pitch is from the top side of the sticker to the top of the next, includes the sticker and gap
     * horizontal pitch: 20 - same as above but from the left side of the sticker to the left of the next
     * page size: 21 x 297 - A4 
     * label heigh: 4
     * label width: 16
     * number across: 10 - columns
     * number down 36 - rows
    
    */
    schemas: [
      [
        {
          name: "0",
          type: "text",
          position: { x: (sheetHeight / sheetRows) * 0, y: (sheetWidth / sheetCols) * 0 },
          width: labelWidth,
          height: labelHeight,
          alignment: "center",
          fontSize: fontSize,
        },
        {
          name: "13",
          type: "text",
          position: { x: (sheetHeight / sheetRows) * 6, y: (sheetWidth / sheetCols) * 1 },
          width: labelWidth,
          height: labelHeight,
          alignment: "center",
          fontSize: fontSize,
        },
      ],
    ],
  };

  const inputs = [{ 0: "ermmmmm", 13: "yeaahhhhhh" }];

  generate({ template, inputs }).then((pdf) => {
    console.log("ya yeet ", pdf);

    const blob = new Blob([pdf.buffer], { type: "application/pdf" });
    window.open(URL.createObjectURL(blob));
  });
};

const CreateHexSticker = () => {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(1);
  const [radio, setRadio] = useState(0);
  const [data, setData] = useState<{ hex: string; decimal: number }[]>([]);

  const manageConversion = () => {
    if (!radio && isNaN(+value)) return;

    let valueRef = !radio ? +value : value;
    const newData = [];

    for (let i = 0; i <= count; i++) {
      typeof valueRef === "string"
        ? newData.push({ hex: valueRef.toUpperCase(), decimal: convertToDec(valueRef) })
        : newData.push({ hex: convertToHex(valueRef).toUpperCase(), decimal: valueRef });

      if (typeof valueRef === "number") {
        valueRef++;
      } else if (typeof valueRef === "string") {
        valueRef = parseInt(valueRef, 16);
        valueRef++;
        valueRef = valueRef.toString(16);
      }
    }

    setData(newData);

    testPDF();
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

      {data.length > 0 && (
        <section className="data-table">
          <HexTable data={data} />
        </section>
      )}
    </>
  );
};

export default CreateHexSticker;
