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
import { createData } from "../../utils/table";
import { Button, Checkbox } from "@mui/material";
import SelectLocationInput from "./SelectLocationInput";
import dayjs from "dayjs";

type Props = {
  row: ReturnType<typeof createData>;
  editMode: boolean;
  refetch: () => void;
  onShowModal: () => void;
};

export const Row: FC<Props> = ({ row, editMode, refetch, onShowModal }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            disabled={row.history?.length === 0}
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
            <SelectLocationInput
              itemId={row.id}
              itemName={row.name}
              refetch={refetch}
              currentLocation={row.storageLocation || ""}
            />
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
              onClick={() => onShowModal()}
            >
              Add Delivery
            </Button>
          </TableCell>
        )}
      </TableRow>

      {/* //Refactor this into own component */}
      {(row.history?.length ?? 0) > 0 && (
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
                      <TableCell>Print</TableCell>
                      <TableCell align="right">Date Received</TableCell>
                      <TableCell align="right">Amount Received</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history?.map((historyRow) => (
                      <TableRow key={`${historyRow.dateReceived}-${historyRow.quantityReceived}`}>
                        <TableCell>
                          <Checkbox defaultChecked />
                        </TableCell>

                        <TableCell component="th" scope="row" align="right">
                          {dayjs(historyRow.dateReceived).format("DD-MM-YYYY HH:mm")}
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
