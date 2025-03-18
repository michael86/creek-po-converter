import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Typography } from "@mui/material";
import api from "../../api";

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

const PdfUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const [messages, setMessages] = useState<{ error: string | null; ok: string | null }>({
    ok: null,
    error: null,
  });

  const beginUpload = async () => {
    setMessages({ error: null, ok: null });

    if (!file) {
      setMessages({ ...messages, error: "No file selected" });
      return;
    }

    var formData = new FormData();
    formData.append("file", file);
    try {
      await api.post("pdf/upload", formData, {
        onUploadProgress: (status) => console.log(status),
      });
      setMessages({ ...messages, ok: "file uploaded" });
    } catch (error: any) {
      if ("message" in error) {
        if (error.message === "ER_DUP_ENTRY")
          return setMessages({ ...messages, error: "Purchase order already uploaded" });

        return setMessages({ ...messages, error: error.message });
      }
    }
  };

  const onFileChange = (fileList: FileList | null) => {
    console.log("set ok tyo null");
    setMessages({ ...messages, ok: null });

    if (!fileList) return;

    setFile(fileList[0]);
    setMessages({ ...messages, error: null });
  };

  console.log("messages ok ", messages.ok);
  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload purchase order
        <VisuallyHiddenInput
          type="file"
          accept="application/pdf"
          onChange={(event) => onFileChange(event.target.files)}
        />
      </Button>
      <Button variant="contained" onClick={beginUpload}>
        Upload
      </Button>
      {file && <Typography variant="body1">{file.name}</Typography>}
      {messages.error && (
        <Typography variant="body1" color="red">
          {messages.error}
        </Typography>
      )}
      {messages.ok && (
        <Typography variant="body1" color="green">
          {messages.ok}
        </Typography>
      )}
    </>
  );
};

export default PdfUpload;
