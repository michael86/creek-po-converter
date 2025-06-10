import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import axios from "../utils/interceptors";
import logo from "../assets/creekview-ems.png";

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

type Part = {
  partNumber: string;
  quantity: string;
};

type ExtractedData = {
  orderReference: string;
  parts: Part[];
};

const StickerTemplate = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ExtractedData | null>(null);

  const beginUpload = async () => {
    if (!file) return;
    setError(null);

    const formData = new FormData();
    formData.append("pdf", file);

    const res = await axios.post("/pdf/process-sticker-template", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { orderReference, parts }: ExtractedData = res.data.data;

    if (res.status === 200 && orderReference && parts) {
      setData({ orderReference, parts });
    } else {
      setError("Upload failed, please check your file and try again.");
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
        >
          Upload
          <VisuallyHiddenInput
            type="file"
            accept=".pdf"
            onChange={(event) => {
              const input = event.target as HTMLInputElement;
              if (input.files && input.files.length > 0) {
                setFile(input.files[0]);
              }
            }}
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

      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

      {data && (
        <>
          <div style={{ marginTop: "20px" }}>
            <h3>Extracted Parts:</h3>
            <ul>
              {data.parts.map((part, index) => (
                <li key={index}>
                  Part Number: {part.partNumber}, Quantity: {part.quantity}
                </li>
              ))}
            </ul>
          </div>

          <Button
            variant="contained"
            onClick={() => window.print()}
            style={{ width: "250px", margin: "20px auto" }}
          >
            Print Labels
          </Button>

          <div className="sheet">
            {[
              ...data.parts,
              ...Array(21 - data.parts.length).fill({ partNumber: "", quantity: "" }),
            ].map((part, index) => (
              <div className="label" key={index}>
                {part.partNumber && (
                  <>
                    <img src={logo} alt="creekview logo" className="sticker-logo" />
                    <div className="content-container">
                      <div>Order: {data.orderReference}</div>
                      <div>Part: {part.partNumber}</div>
                      <div>Qty: {parseFloat(part.quantity).toLocaleString()}</div>
                      <div>Dispatched: {new Date().toLocaleDateString()}</div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Label printing styles */}
      <style>{`
        @media print {
          body {
            margin: 0;
          }

          button, ul, h3, p, .MuiButtonBase-root {
            display: none;
          }

          .sheet {
            margin: 0;
          }
           
          .sticker-logo {
            top: 16mm !important;
            right: -2mm !important;
          }

         .content-container {
            top: 22mm !important;
            left: 8.5mm !important;
            line-height: 1.4;
          } 
        }

        .sheet {
          width: 210mm;
          height: 297mm;
          display: grid;
          grid-template-columns: repeat(3, 63.5mm);
          grid-auto-rows: 38.1mm;
          gap: 0 3.5mm;
          padding: 14.5mm 6.5mm;;
          box-sizing: border-box;
        }

        .label {
          box-sizing: border-box;
          border: 1px solid black;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          text-align: left;
        }

        .sticker-logo {
            padding-left: 40mm !important;
            position: absolute;
            top: 2mm;
            right: 2mm;
        }

        .content-container {
          position: absolute;
          top: 3.5mm;
          left: 2mm;
          line-height: 1.4;
          font-size: 15pt;
        }
      `}</style>
    </div>
  );
};

export default StickerTemplate;
