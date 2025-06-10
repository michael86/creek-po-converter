import {
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Checkbox,
  Table,
} from "@mui/material";

type Props = {
  data: { parts: { partNumber: string; quantity: string }[] };
  handleStickerCheckbox: (index: number) => void;
};

const StickerTemplateTable: React.FC<Props> = ({ data, handleStickerCheckbox }) => {
  console.log("StickerTemplateTable data:", data.parts);
  return (
    <div className="sticker-template-table-container" style={{ width: "80%" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Extracted Parts:
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Print</TableCell>
              <TableCell align="right">Part Number</TableCell>
              <TableCell align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.parts.map((part, index) => (
              <TableRow key={`${part.partNumber}-${index}`}>
                <TableCell>
                  <Checkbox defaultChecked onChange={() => handleStickerCheckbox(index)} />
                </TableCell>
                <TableCell align="right">{part.partNumber}</TableCell>
                <TableCell align="right">{parseFloat(part.quantity)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StickerTemplateTable;
