import { TableRow, TableCell, CircularProgress } from "@mui/material";
import { UpdateGenericResponse, useQueryStatus, User } from "../../types/api";
import { useState } from "react";

import Error from "./Error";
import SelectInput from "./Select";
import { useUpdateUserRole } from "../../api/queries/useUpdateUserRole";

type Props = {
  user: User;
};

const RoleSelect: React.FC<Props> = ({ user }) => {
  const [value, setValue] = useState<string>(String(user.role_id));
  const [status, setStatus] = useState<useQueryStatus | UpdateGenericResponse>("idle");
  const { mutateAsync } = useUpdateUserRole();

  const handleChange = async (role: string, id: number) => {
    setStatus("loading");

    try {
      await mutateAsync({ id, role: Number(role) });
      setStatus("idle");
      setValue(role);
    } catch (error) {
      console.error("Error updating user role:", error);
      setStatus("error");
    }
  };

  return (
    <TableRow key={user.email} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {user.email}
      </TableCell>
      <TableCell align="right">{user.name}</TableCell>
      <TableCell align="right">
        {status === "error" ? (
          <Error />
        ) : status === "loading" ? (
          <CircularProgress size={40} />
        ) : (
          <SelectInput id={user.id} handleChange={handleChange} value={value} />
        )}
      </TableCell>
      <TableCell align="right">{new Date(user.dateCreated).toLocaleDateString()}</TableCell>
    </TableRow>
  );
};

export default RoleSelect;
