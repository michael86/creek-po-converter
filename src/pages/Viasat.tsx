import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  CardActions,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { styled } from "@mui/system";
import duck from "../assets/rubber_duck.png";
import { parseViasatData } from "../utils/excel";
import { generateViasatPdf } from "../utils/pdf";
import { ViasatSticker } from "../types/stickers";
import ViasatCard from "../components/Viasat/ViasatCard";

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

const Viasat = () => {
  const [template, setTemplate] = useState<"e-lock" | "e-touch">("e-lock");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ViasatSticker[] | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value !== "e-lock" && value !== "e-touch") return;
    setTemplate(value);
  };

  const onSubmit = () => {
    if (!file) return setError("Please select a file to upload.");
    if (!template) return setError("Please select a template.");
    setError(null);

    const reader = new FileReader();

    reader.onload = (event) => {
      const arrayBuffer = event.target?.result;

      if (!(arrayBuffer instanceof ArrayBuffer)) {
        setError("Invalid file format. Expected ArrayBuffer.");
        return;
      }

      try {
        const stickerData = parseViasatData(arrayBuffer);
        setData(stickerData);
        generateViasatPdf(stickerData);
      } catch (e) {
        console.error("Error processing file:", e);
        setError((e as Error).message);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <Typography align="center" variant="h3" component="h1">
        Print Viasat Stickers
      </Typography>
      <ViasatCard />
    </>
  );
};

export default Viasat;
