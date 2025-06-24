import {
  Typography,
  FormControl,
  Button,
  RadioGroup,
  FormControlLabel,
  InputLabel,
  Input,
  Radio,
  Card,
} from "@mui/material";
import { useState } from "react";
import { generateHexCodes } from "../utils/generateHexStickers";
import { openHtmlLabelSheet } from "../utils/genhexPage";

const HexStickers = () => {
  const [startCountInput, setStartCountInput] = useState("");
  const [amountInput, setAmountInput] = useState("");

  const [amount, setAmount] = useState(0);
  const [printFormat, setPrintFormat] = useState<"hex" | "decimal">("hex");

  const handleStartCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;
    if (raw === "") {
      setStartCountInput("");
      setStartCount(0);
      return;
    }
    if (/^0[0-9]+/.test(raw)) raw = raw.replace(/^0+/, "");
    const num = Number(raw);
    if (!isNaN(num)) {
      setStartCountInput(raw);
      setStartCount(num);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;
    if (raw === "") {
      setAmountInput("");
      setAmount(0);
      return;
    }
    if (/^0[0-9]+/.test(raw)) raw = raw.replace(/^0+/, "");
    const num = Number(raw);
    if (!isNaN(num)) {
      setAmountInput(raw);
      setAmount(num);
    }
  };

  const handleGenerate = () => {
    const radio = printFormat === "decimal" ? 0 : 1;
    const data = generateHexCodes(startCountInput, amount, radio);
    if (data) {
      openHtmlLabelSheet(data, printFormat);
    }
  };

  return (
    <>
      <Typography component={"h1"} variant="h3" align="center">
        Create Hex Stickers
      </Typography>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "Center",
          padding: 2,
        }}
      >
        <InputLabel sx={{ marginBottom: 2 }}>
          Start Count:
          <Input
            color="primary"
            margin="dense"
            name="start-count"
            required
            type="text"
            value={startCountInput}
            onChange={handleStartCountChange}
          />
        </InputLabel>

        <InputLabel sx={{ marginBottom: 2 }}>
          Amount Required:
          <Input
            color="primary"
            name="count-amount"
            required
            type="text"
            value={amountInput}
            onChange={handleAmountChange}
          />
        </InputLabel>

        <FormControl>
          <RadioGroup
            sx={{ display: "flex", flexDirection: "row", marginBottom: 2 }}
            defaultValue="decimal"
            name="radio-buttons-group"
            value={printFormat}
            onChange={(e) =>
              setPrintFormat(e.target.value.toLowerCase() as "hex" | "decimal")
            }
          >
            <FormControlLabel
              value="decimal"
              control={<Radio />}
              label="decimal"
            />
            <FormControlLabel value="hex" control={<Radio />} label="hex" />
          </RadioGroup>
        </FormControl>

        <div className="button-container-hex">
          <Button variant="contained" onClick={handleGenerate}>
            Generate
          </Button>
        </div>
      </Card>
    </>
  );
};

export default HexStickers;
