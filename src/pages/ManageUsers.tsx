import { Alert, List, ListItem, Typography } from "@mui/material";
import { useAppSelector } from "../store";
import ManageUsersTable from "../components/manageUsersTable/Index";
import { Box } from "@mui/system";

const ManageUsers = () => {
  const auth = useAppSelector((state) => state.auth);

  return (
    <>
      <Typography align="center" sx={{ marginBottom: 1.5 }} variant="h1">
        Manage Users
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",

          width: "100%",
          paddingX: 2,
          marginBottom: 2,
        }}
      >
        <Box sx={{ paddingLeft: 55, flex: 1, textAlign: "center" }}>
          <Typography variant="body1">Hi {auth.user}, you can manage users here.</Typography>
        </Box>

        <Box sx={{ marginLeft: 4 }}>
          <Alert
            severity="info"
            sx={{
              maxWidth: 300,
              marginRight: 22,
            }}
          >
            User roles are as follows:
            <List>
              <ListItem>1: Basic</ListItem>
              <ListItem>2: Purchasing Team</ListItem>
              <ListItem>3: Stores</ListItem>
              <ListItem>4: Admin</ListItem>
            </List>
          </Alert>
        </Box>
      </Box>

      <ManageUsersTable />
    </>
  );
};

export default ManageUsers;
