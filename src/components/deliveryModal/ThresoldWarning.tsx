import { Typography } from "@mui/material";

const ThresholdWarning = () => {
  return (
    <Typography variant="body2" color="warning" gutterBottom>
      Warning, this may allow physical stock to come out of sync with this system
    </Typography>
  );
};

export default ThresholdWarning;
