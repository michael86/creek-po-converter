import { fetchPoNames } from "../api/queries/getPurchaseOrders";
import { Container, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const PurchaseOrderSelect = () => {
  const { data } = fetchPoNames();
  const names = data.data;

  return (
    <Container maxWidth={"sm"} style={{ marginTop: "2rem" }}>
      <FormControl fullWidth>
        <InputLabel id="purchase-order-select">Select Purchase Order</InputLabel>
        <Select labelId="purchase-order-select" id="purchase-order-select" label="Purchase orders">
          {names.map((name) => {
            return <MenuItem value={name.uuid}>{name.poNumber}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Container>
  );
};

export default PurchaseOrderSelect;
