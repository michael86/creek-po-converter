import { Theme } from "@emotion/react";
import { SxProps, Typography } from "@mui/material";

type Props = {
  message?: string;
  sx?: SxProps<Theme>;
};

const ThresholdWarning: React.FC<Props> = ({ message, sx }) => {
  return (
    <Typography variant="body2" color="warning" gutterBottom sx={sx ? sx : {}}>
      {message
        ? message
        : "Warning, this may allow physical stock to come out of sync with this system"}
    </Typography>
  );
};

export default ThresholdWarning;
