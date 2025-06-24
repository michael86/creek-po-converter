import { Typography } from "@mui/material";

const ErrorMessage = ({ error }: { error: string | null }) =>
  error ? (
    <Typography variant="body2" color="error" sx={{ mt: 2 }}>
      {error}
    </Typography>
  ) : null;

export default ErrorMessage;
