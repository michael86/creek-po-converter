import { Box, Button, Typography } from "@mui/material";
import { useAppSelector } from "../store";
import { roles } from "../schemas/dashboardButtons";
import { useRouter } from "@tanstack/react-router";

const Dashboard = () => {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);
  const roleButtons = roles[auth.role!] || [];

  return (
    <>
      <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
        <Typography variant="h4">Dashboard</Typography>
        <Typography variant="body1">Welcome {auth.user}</Typography>

        {!roleButtons.length ? (
          <Typography variant="body1" color="red">
            No role assigned, speak to an admin
          </Typography>
        ) : (
          roleButtons.map((button) => {
            return (
              <Button variant="contained" onClick={() => router.navigate({ to: button.route })}>
                {button.label}
              </Button>
            );
          })
        )}
      </Box>
    </>
  );
};

export default Dashboard;
