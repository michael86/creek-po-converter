import { FormEvent, useRef, useState } from "react";
import axios from "../utils/interceptors";
import "../styles/process.css";
import { Button, TextField } from "@mui/material";

const ProcessPdf = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadStatus, setUploadStatus] = useState<null | string>(null);

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();

    if (!fileInputRef.current) return;
    const f = fileInputRef.current.children[0].children[0] as HTMLInputElement;

    if (!f.files) return;

    const file = f.files[0];
    if (!file) return;

    if (file) {
      const formData = new FormData();
      formData.append("pdf", file);

      try {
        const result = await axios.post("pdf/process", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const status = result.data.status;

        if (status === 1) {
          setUploadStatus("File uploaded");
        } else if (status === 3) {
          setUploadStatus("File was empty or couldn't be parsed");
        } else if (status === 4) {
          setUploadStatus("This file was previously uploaded");
        } else {
          setUploadStatus("failed - contact michael");
        }

        setTimeout(() => setUploadStatus(null), 5000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form className="upload-pdf">
      <h2>Upload PDF</h2>
      <p>This service only works with PDFs produced by Caliach</p>
      <TextField type="file" name="pdf" id="pdf" ref={fileInputRef} variant="outlined" />

      <div style={{ marginTop: "1rem" }}>
        <Button onClick={handleUpload} variant="contained">
          Upload
        </Button>
      </div>

      {uploadStatus && <p>{uploadStatus}</p>}
    </form>
  );
};

export default ProcessPdf;
