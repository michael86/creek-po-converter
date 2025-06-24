import { Button } from "@mui/material";

const PrintButton = ({ onClick }: { onClick: () => void }) => (
  <Button variant="contained" onClick={onClick}>
    Print
  </Button>
);

export default PrintButton;
