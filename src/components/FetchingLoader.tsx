import { Box, CircularProgress, Typography } from "@mui/material";

const FetchingLoader = () => {
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
        Fetching Data
      </Typography>
    </Box>
  );
};

export default FetchingLoader;
