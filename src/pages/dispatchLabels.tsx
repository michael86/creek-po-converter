import { Button, Typography } from "@mui/material";
import { useState } from "react";

import logo from "../assets/creekview-ems.png";
import { Box } from "@mui/system";

type Part = {
  partNumber: string;
  quantity: string;
};

type ExtractedData = {
  orderReference: string;
  parts: Part[];
};

const StickerTemplate = () => {
  const [data, setData] = useState<ExtractedData | null>(null);

  const genBlankStickers = () => {
    setData({
      orderReference: "",
      parts: Array.from({ length: 21 }, () => ({
        partNumber: "",
        quantity: "",
      })),
    });
  };

  return (
    <>
      <Typography align="center" variant="h1" gutterBottom>
        Creekview Sticker Template
      </Typography>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "0 70px",
          gap: "20px",
        }}
      >
        <Button variant="contained" onClick={genBlankStickers}>
          Generate Labels
        </Button>
      </div>

      {data && (
        <>
          <Box display={"flex"} justifyContent={"center"}>
            <Button
              variant="contained"
              onClick={() => window.print()}
              style={{ width: "250px", margin: "20px auto" }}
            >
              Print Labels
            </Button>
          </Box>
          <div className="sheet" style={{ margin: "auto" }}>
            {[
              ...data.parts,
              ...Array(21 - data.parts.length).fill({
                partNumber: "",
                quantity: "",
              }),
            ].map((_, index) => (
              <div className="label" key={index}>
                <>
                  <img
                    src={logo}
                    alt="creekview logo"
                    className="sticker-logo"
                  />
                  <div className="content-container">
                    <div>Order:</div>
                    <div>Part:</div>
                    <div>Qty:</div>
                    <div>Dispatched:</div>
                  </div>
                </>
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

    button,
    ul,
    h3,
    p,
    .MuiButtonBase-root,
    h1,
    .MuiTypography-h5,
    .no-print {
      display: none;
    }

    .sheet {
      margin: 0;
    }

    .sticker-logo {
      top: 2mm !important;
      right: 2mm !important;
    }

    .content-container {
      top: 2mm !important;
      left: 2mm !important;
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
    padding: 14.5mm 6.5mm;
    box-sizing: border-box;
  }

  .label {
    box-sizing: border-box;
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
    width: 100% !important;
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
