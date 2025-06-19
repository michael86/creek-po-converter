import { Alert, List, ListItem, Tooltip, Typography } from "@mui/material";
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
            All roles have access to dispatch labels, User roles are as follows:
            <List sx={{ maxHeight: 200, overflow: "auto" }}>
              <Tooltip title="Full system access including all departments and user management">
                <ListItem>1: Admin</ListItem>
              </Tooltip>
              <Tooltip title="Can upload and manage purchase orders">
                <ListItem>2: Purchasing Team</ListItem>
              </Tooltip>
              <Tooltip title="Stores team lead with full stores access and ability to assign stores roles">
                <ListItem>3: Stores Admin</ListItem>
              </Tooltip>
              <Tooltip title="Full stores access except assigning roles">
                <ListItem>4: Stores Moderator</ListItem>
              </Tooltip>
              <Tooltip title="Can upload and edit store purchase orders but not delete">
                <ListItem>5: Stores Editor</ListItem>
              </Tooltip>
              <Tooltip title="Read-only access to store purchase orders">
                <ListItem>6: Stores Viewer</ListItem>
              </Tooltip>
              <Tooltip title="Access to Viasat labels only">
                <ListItem>7: Production Team</ListItem>
              </Tooltip>
              <Tooltip title="Access to Hex test stickers only">
                <ListItem>8: Test Team</ListItem>
              </Tooltip>
            </List>
          </Alert>
        </Box>
      </Box>

      <ManageUsersTable />
    </>
  );
};

export default ManageUsers;
