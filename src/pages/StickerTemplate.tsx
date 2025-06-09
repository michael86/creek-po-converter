import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";

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

const StickerTemplate = () => {
  const [file, setFile] = useState<File | null>(null);

  const beginUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      console.log("Upload successful");
    } else {
      console.error("Upload failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        width: "80%",
        margin: "auto",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <p style={{ marginRight: "25px" }}>Select File</p>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          style={{ width: "200px" }}
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onChange={(event) => {
            const input = event.target as HTMLInputElement;
            if (input.files && input.files.length > 0) {
              setFile(input.files[0]);
            }
          }}
        >
          <VisuallyHiddenInput
            type="file"
            accept=".pdf"
            onChange={(event) => console.log(event.target.files)}
            multiple
          />
        </Button>
      </div>
      {file && (
        <>
          <p>{file.name}</p>
          <Button
            variant="contained"
            style={{ width: "250px", margin: "auto" }}
            onClick={beginUpload}
          >
            Extract
          </Button>
        </>
      )}
    </div>
  );
};

export default StickerTemplate;
