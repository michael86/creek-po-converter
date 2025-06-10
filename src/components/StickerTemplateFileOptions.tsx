import { Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

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

type Props = {
  setFile: (file: File) => void;
  beginUpload: () => void;
  file: File | null;
};

const StickerTemplateFileOptions: React.FC<Props> = ({ setFile, beginUpload, file }) => {
  return (
    <>
      <Typography variant="h5" component="div" gutterBottom>
        Upload your PDF file
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Please upload a PDF file containing the sticker template. The system will attempt to extract
        the order reference and part numbers for printing.
      </Typography>

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
          <Button
            component="label"
            role={undefined}
            variant="contained"
            style={{ width: "200px" }}
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            className="no-print"
          >
            Select File
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

          {file && (
            <>
              <Typography
                variant="body1"
                color={"Highlight"}
                style={{ marginTop: "10px", marginLeft: "20px" }}
              >
                {file.name}
              </Typography>
            </>
          )}
        </div>
        <Button
          variant="contained"
          style={{ width: "250px", margin: "auto", marginTop: "20px" }}
          onClick={beginUpload}
        >
          Extract
        </Button>
      </div>
    </>
  );
};

export default StickerTemplateFileOptions;
