import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import * as XLSX from "xlsx";
import React from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreateViasatStickers = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [template, setTemplate] = useState<"E-Lock" | "E-Touch">("E-Touch");
  const [data, setData] = useState<unknown[] | null>(null);

  const handleTemplateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTemplate((event.target as HTMLInputElement).value as "E-Touch" | "E-Lock");
  };

  const onSubmit = () => {
    if (!file) return setError("Please select a file to upload.");
    setError(null);
    if (!template) return setError("Please select a template.");
    setError(null);
    console.log("Selected template:", template);
    const reader = new FileReader();

    reader.onload = (event) => {
      console.log("File loaded:", event);
      const data = event.target?.result;
      console.log("File data:", data);
      if (typeof data !== "string") {
        setError("Invalid file format.");
        return;
      }

      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);

      setData(sheetData);
    };
  };

  console.log("template", template);
  console.log("file", file);
  console.log("data", data);

  return (
    <div className="create-viasat-stickers">
      <Typography variant="h1" align="center" gutterBottom>
        Create Viasat Stickers
      </Typography>
      <Card
        className="card"
        sx={{
          maxWidth: "60%",
          padding: 5,
          display: "flex",
          margin: "auto",
          flexDirection: "column",
          alignItems: "center",
        }}
        variant="outlined"
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Select a sticker template to create Viasat stickers.
          </Typography>

          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={template}
              onChange={handleTemplateChange}
            >
              <FormControlLabel value="E-Touch" control={<Radio />} label="E-Touch" />
              <FormControlLabel value="E-Lock" control={<Radio />} label="E-Lock" />
            </RadioGroup>
          </FormControl>

          <div
            className="upload-button"
            style={{ marginTop: "20px", display: "flex", justifyContent: "space-evenly" }}
          >
            <Button
              component="label"
              role={undefined}
              variant="contained"
              style={{ width: "200px" }}
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              disabled={!!file}
            >
              Select File
              <VisuallyHiddenInput
                type="file"
                accept=".xls,.xlsx,.xlsm,.xlsb,.csv"
                id="file-upload"
                onChange={(event) => {
                  const input = event.target as HTMLInputElement;
                  if (input.files && input.files.length > 0) {
                    setFile(input.files[0]);
                    setError(null);
                  }
                }}
              />
            </Button>

            {file && (
              <Typography variant="body1" color={"Highlight"} style={{ marginTop: "10px" }}>
                {file.name}
              </Typography>
            )}
          </div>
        </CardContent>

        <CardActions>
          <Button variant="contained" onClick={onSubmit}>
            Submit
          </Button>
        </CardActions>

        {error && (
          <Typography variant="body2" color="error" style={{ marginTop: "20px" }}>
            {error}
          </Typography>
        )}
      </Card>

      {data && (
        <Card
          sx={{ maxWidth: "60%", padding: 5, margin: "auto", marginTop: "20px" }}
          variant="outlined"
        >
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Extracted Data
            </Typography>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CreateViasatStickers;
