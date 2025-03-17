import { Typography } from "@mui/material";
import { useAppSelector } from "../store";

const Dashboard = () => {
  const auth = useAppSelector((state) => state.auth);

  return (
    <>
      <Typography variant="h4">Dashboard</Typography>
      <Typography variant="body1">Welcome {auth.user}</Typography>
    </>
  );
};

export default Dashboard;
