import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Input,
  InputLabel,
  TextareaAutosize,
  Typography,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { addPropelairEntry } from "../api/queries/putPropelairEntry";
import { useAppSelector } from "../store";

const Propelair = () => {
  const name = useAppSelector((state) => state.auth.user);
  const [hex, setHex] = useState("");

  const [formState, setFormState] = useState({
    serialNumber: "",
    unitVoltage: "24V",
    comments: "",
    // flush test checkboxes
    flushTestsOne: false,
    flushTestsTwo: false,
    flushTestsThree: false,
    flushTestsFour: false,
    flushTestsFive: false,
    // component test checkboxes
    boxLidSn: false,
    visualInspection: false,
    boxCondition: false,
    template: false,
    ancilliaryPack: false,
    chargingCircuit: false,
    fuse: false,
    agv: false,
    resetAgvOpen: false,
    dryFlush: false,
    countingIot: false,
    led: false,
  });

  const onSerialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormState((prev) => ({ ...prev, serialNumber: value }));

    const serialNumber = parseInt(value, 10);
    if (!isNaN(serialNumber)) {
      const hexValue = serialNumber.toString(16).toUpperCase();
      setHex(hexValue);
    } else {
      setHex("");
    }
  };

  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormState((prev) => ({ ...prev, [name]: checked }));
  };

  const onRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, unitVoltage: event.target.value }));
  };

  const onCommentsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, comments: event.target.value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = { ...formState, hex, username: name };

    try {
      await addPropelairEntry(data);

      alert("Entry saved successfully!");
      setFormState({
        serialNumber: "",
        unitVoltage: "",
        comments: "",
        flushTestsOne: false,
        flushTestsTwo: false,
        flushTestsThree: false,
        flushTestsFour: false,
        flushTestsFive: false,
        boxLidSn: false,
        visualInspection: false,
        chargingCircuit: false,
        fuse: false,
        agv: false,
        resetAgvOpen: false,
        dryFlush: false,
        countingIot: false,
        led: false,
        boxCondition: false,
        ancilliaryPack: false,
        template: false,
      });
      // reset hex if it’s a separate state
      setHex("");
    } catch (err) {
      alert("Failed to save entry, check console for details");
    }
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Propelair
      </Typography>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
        }}
        onSubmit={onSubmit}
      >
        <InputLabel htmlFor="serial-number">Serial number</InputLabel>
        <Input
          id="serial-number"
          name="serialNumber"
          type="number"
          value={formState.serialNumber}
          onChange={onSerialChange}
        />

        <InputLabel htmlFor="hex">Hex</InputLabel>
        <Input id="hex" name="hex" type="text" value={hex} readOnly />

        <FormControl sx={{ mt: 2 }}>
          <FormLabel id="unit-voltage-label">Unit Voltage</FormLabel>
          <RadioGroup
            aria-labelledby="unit-voltage-label"
            value={formState.unitVoltage}
            name="unitVoltage"
            onChange={onRadioChange}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel value="24V" control={<Radio />} label="24V" />
            <FormControlLabel value="230V" control={<Radio />} label="230V" />
          </RadioGroup>
        </FormControl>

        <Typography variant="h4" sx={{ mt: 4 }}>
          Flush test
        </Typography>

        <FormGroup sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                name="flushTestsOne"
                checked={formState.flushTestsOne}
                onChange={onCheckboxChange}
              />
            }
            label="1"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="flushTestsTwo"
                checked={formState.flushTestsTwo}
                onChange={onCheckboxChange}
              />
            }
            label="2"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="flushTestsThree"
                checked={formState.flushTestsThree}
                onChange={onCheckboxChange}
              />
            }
            label="3"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="flushTestsFour"
                checked={formState.flushTestsFour}
                onChange={onCheckboxChange}
              />
            }
            label="4"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="flushTestsFive"
                checked={formState.flushTestsFive}
                onChange={onCheckboxChange}
              />
            }
            label="5"
          />
        </FormGroup>

        <Typography variant="h4" sx={{ mt: 4 }}>
          Component test
        </Typography>

        <FormGroup
          sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
        >
          {[
            "boxLidSn",
            "visualInspection",
            "boxCondition",
            "template",
            "ancilliaryPack",
            "chargingCircuit",
            "fuse",
            "agv",
            "resetAgvOpen",
            "dryFlush",
            "countingIot",
            "led",
          ].map((name) => (
            <FormControlLabel
              key={name}
              control={
                <Checkbox
                  name={name}
                  checked={(formState as any)[name]}
                  onChange={onCheckboxChange}
                />
              }
              label={name}
            />
          ))}
        </FormGroup>

        <Typography variant="h4" sx={{ mt: 4 }}>
          Comments/Faults
        </Typography>
        <TextareaAutosize
          name="comments"
          minRows={3}
          value={formState.comments}
          onChange={onCommentsChange}
        />

        <Button variant="contained" type="submit" sx={{ mt: 2, mb: 4 }}>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Propelair;
