import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

import FetchingLoader from "../FetchingLoader";
import { useUsers } from "../../api/queries/getUsers";
import RoleSelect from "./RoleSelect";
import { useAppSelector } from "../../store";

const ManageUsersTable = () => {
  const { data: users, isLoading, isError } = useUsers();
  const userEmail = useAppSelector((state) => state.auth.email);

  if (isError || !users?.length)
    return (
      <Typography align="center" variant="body1" color="danger">
        No users found.
      </Typography>
    );

  if (isLoading) {
    return <FetchingLoader />;
  }

  return (
    <TableContainer component={Paper} sx={{ margin: "auto", width: "80%" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Date Registered</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            if (userEmail !== user.email) {
              return <RoleSelect key={user.email} user={user} />;
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManageUsersTable;
