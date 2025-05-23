import { FC, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { createData } from "../utils/table";
import { Button } from "@mui/material";
import SelectLocationInput from "./SelectLocationInput";

type Props = {
  row: ReturnType<typeof createData>;
  editMode: boolean;
};

export const Row: FC<Props> = ({ row, editMode }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            disabled={row.history.length === 0}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.description}</TableCell>
        <TableCell align="right">{row.quantity}</TableCell>
        <TableCell align="right">{row.quantityReceived}</TableCell>
        <TableCell align="right">
          {editMode ? (
            // <TextField
            //   type="text"
            //   value={row.storageLocation || "No location assigned"}
            // ></TextField>
            <SelectLocationInput itemId={row.id} />
          ) : (
            row.storageLocation || "No location assigned"
          )}
        </TableCell>
        <TableCell align="right">{new Date(row.dueDate).toLocaleDateString()}</TableCell>

        {editMode && (
          <TableCell>
            <Button
              variant="contained"
              style={{ marginTop: "50%", transform: "translateY(-100%)" }}
            >
              Add Delivery
            </Button>
          </TableCell>
        )}
      </TableRow>

      {row.history.length > 0 && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date Received</TableCell>
                      <TableCell align="right">Amount Received</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={`${historyRow.dateReceived}-${historyRow.quantityReceived}`}>
                        <TableCell component="th" scope="row">
                          {new Date(historyRow.dateReceived).toLocaleDateString()}
                        </TableCell>

                        <TableCell align="right">{historyRow.quantityReceived}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default Row;
