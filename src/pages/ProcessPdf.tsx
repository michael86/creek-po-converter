import { FormEvent, useRef, useState } from "react";
import axios from "../utils/interceptors";
import "../styles/process.css";

const ProcessPdf = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadStatus, setUploadStatus] = useState<null | string>(null);

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();

    if (!fileInputRef.current || !fileInputRef.current.files) return;

    const file = fileInputRef.current.files[0];

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
      <input type="file" name="pdf" id="pdf" ref={fileInputRef} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </form>
  );
};

export default ProcessPdf;
