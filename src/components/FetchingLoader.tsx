import { Box, CircularProgress, Typography } from "@mui/material";

type Props = {
  message?: string;
};

const FetchingLoader: React.FC<Props> = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "15rem",
      }}
    >
      <CircularProgress />
      <Typography variant="body1" fontSize={25}>
        {message ? message : "Fetching Data"}
      </Typography>
    </Box>
  );
};

export default FetchingLoader;
