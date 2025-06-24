import { Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/system";

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

interface Props {
  file: File | null;
  onFileUpload: (file: File) => void;
}

const FileUploader = ({ file, onFileUpload }: Props) => (
  <div
    style={{ marginTop: 20, display: "flex", justifyContent: "space-evenly" }}
  >
    <Button
      component="label"
      variant="contained"
      style={{ width: 200 }}
      startIcon={<CloudUploadIcon />}
    >
      Select File
      <VisuallyHiddenInput
        type="file"
        accept=".xls,.xlsx,.xlsm,.xlsb,.csv"
        onChange={(e) => {
          const selected = e.target.files?.[0];
          if (selected) onFileUpload(selected);
        }}
      />
    </Button>
    {file && (
      <Typography variant="body1" color="Highlight" style={{ marginTop: 10 }}>
        {file.name}
      </Typography>
    )}
  </div>
);

export default FileUploader;
