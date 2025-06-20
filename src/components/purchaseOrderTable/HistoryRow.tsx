import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  Checkbox,
} from "@mui/material";
import dayjs from "dayjs";
import { Deliveries } from "../../types/state/purchaseOrders";
import { useLabelManager } from "../../hooks/useLabelManager";

type Props = {
  history: Deliveries;
  open: boolean;
  handleLabelsChange: ReturnType<typeof useLabelManager>["handleLabelsChange"];
  partNumber: string;
  description: string;
  location: string | null;
};

const HistoryRow: React.FC<Props> = ({
  history,
  open,
  handleLabelsChange,
  partNumber,
  description,
  location,
}) => {
  return (
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
                {history.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Checkbox
                        onChange={() => handleLabelsChange(row, partNumber, description, location)}
                      />
                    </TableCell>

                    <TableCell component="th" scope="row" align="right">
                      {dayjs(row.dateReceived).format("DD-MM-YYYY HH:mm")}
                    </TableCell>

                    <TableCell align="right">{row.quantityReceived}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default HistoryRow;
