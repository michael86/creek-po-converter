import { useState } from "react";
import { Card, CardContent, CardMedia, CardActions } from "@mui/material";
import duck from "../../assets/rubber_duck.png";
import TemplateSelector from "./TemplateSelector";
import FileUploader from "./FileUploader";
import ErrorMessage from "./ErrorMessage";
import PrintButton from "./PrintButton";
import { parseViasatData } from "../../utils/excel";
import { generateViasatPdf } from "../../utils/pdf";
import { ViasatSticker } from "../../types/stickers";

const ViasatCard = () => {
  const [template, setTemplate] = useState<"e-lock" | "e-touch">("e-lock");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
  };

  const handlePrint = () => {
    if (!file) return setError("Please select a file to upload.");
    if (!template) return setError("Please select a template.");

    setError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target?.result;
      if (!(arrayBuffer instanceof ArrayBuffer))
        return setError("Invalid file format. Expected ArrayBuffer.");

      try {
        const stickerData: ViasatSticker[] = parseViasatData(arrayBuffer);
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
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          height="194"
          image={duck}
          alt="Rubber duck"
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <TemplateSelector template={template} onChange={setTemplate} />
          <FileUploader file={file} onFileUpload={handleFileUpload} />
          <ErrorMessage error={error} />
          <CardActions sx={{ justifyContent: "center" }}>
            <PrintButton onClick={handlePrint} />
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
};

export default ViasatCard;
