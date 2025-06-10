import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "../utils/interceptors";
import logo from "../assets/creekview-ems.png";
import StickerTemplateFileOptions from "../components/StickerTemplateFileOptions";

import StickerTemplateTable from "../components/StickerTemplateTable";

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
  const [template, setTemplate] = useState<"blank" | "file">("blank");

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

  const handleTemplateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTemplate((event.target as HTMLInputElement).value as "blank" | "file");
  };

  const genBlankStickers = () => {
    setData({
      orderReference: "",
      parts: Array.from({ length: 21 }, () => ({ partNumber: "", quantity: "" })),
    });
  };

  const handleStickerCheckbox = (index: number) => {
    console.log("handleStickerCheckbox", index);

    if (!data || typeof index !== "number") return;

    data.parts.splice(index, 1);

    if (data.parts.length === 0) {
      return setData(null);
    }

    setData({ ...data });
  };

  return (
    <>
      <Typography align="center" variant="h1" gutterBottom>
        Creekview Sticker Template
      </Typography>

      <div
        style={{ display: "flex", justifyContent: "space-evenly", padding: "0 70px", gap: "20px" }}
      >
        <Card sx={{ width: "80%" }} variant="outlined" className="no-print">
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Select Sticker Template
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              File will attempt to extract order reference and part numbers from the PDF. Blank will
              print
            </Typography>

            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={template}
                onChange={handleTemplateChange}
              >
                <FormControlLabel value="blank" control={<Radio />} label="blank" />
                <FormControlLabel value="file" control={<Radio />} label="file" />
              </RadioGroup>
            </FormControl>

            {template === "file" ? (
              <StickerTemplateFileOptions setFile={setFile} beginUpload={beginUpload} file={file} />
            ) : (
              <div>
                <Button variant="contained" onClick={genBlankStickers}>
                  Print
                </Button>
              </div>
            )}
            {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
          </CardContent>
        </Card>

        {data && template === "file" && (
          <StickerTemplateTable data={data} handleStickerCheckbox={handleStickerCheckbox} />
        )}
      </div>

      {data && (
        <>
          <Button
            variant="contained"
            onClick={() => window.print()}
            style={{ width: "250px", margin: "20px auto" }}
          >
            Print Labels
          </Button>
          <div className="sheet" style={{ margin: "auto" }}>
            {[
              ...data.parts,
              ...Array(21 - data.parts.length).fill({ partNumber: "", quantity: "" }),
            ].map((part, index) => (
              <div className="label" key={index}>
                {(part.partNumber || template === "blank") && (
                  <>
                    <img src={logo} alt="creekview logo" className="sticker-logo" />
                    <div className="content-container">
                      <div>Order: {data.orderReference}</div>
                      <div>Part: {part.partNumber}</div>
                      <div>
                        Qty:{" "}
                        {template !== "blank" ? parseFloat(part.quantity).toLocaleString() : ""}
                      </div>
                      <div>
                        Dispatched: {template === "blank" ? "" : new Date().toLocaleDateString()}
                      </div>
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

          button, ul, h3, p, .MuiButtonBase-root, h1, .MuiTypography-h5, .no-print  {
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
    </>
  );
};

export default StickerTemplate;
