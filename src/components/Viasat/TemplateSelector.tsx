import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface Props {
  template: "e-lock" | "e-touch";
  onChange: (value: "e-lock" | "e-touch") => void;
}

const TemplateSelector = ({ template, onChange }: Props) => (
  <FormControl>
    <FormLabel id="template-radio-group">Template</FormLabel>
    <RadioGroup
      row
      aria-labelledby="template-radio-group"
      name="template"
      value={template}
      onChange={(e) => onChange(e.target.value as "e-lock" | "e-touch")}
    >
      <FormControlLabel value="e-lock" control={<Radio />} label="E-Lock" />
      <FormControlLabel value="e-touch" control={<Radio />} label="E-Touch" />
    </RadioGroup>
  </FormControl>
);

export default TemplateSelector;
