import { fetchPoNames } from "../../api/queries/getPurchaseOrders";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { setUuid } from "../../store/slices/purchaseOrder";

const PurchaseOrderSelect = () => {
  const dispatch = useAppDispatch();
  const { uuid } = useAppSelector((state) => state.purchaseOrder);

  const [value, setValue] = useState(uuid || "");

  const { data } = fetchPoNames();
  const names = data.data;

  const onChange = (e: SelectChangeEvent) => {
    const { value } = e.target;
    if (!value) return;

    setValue(value);
    dispatch(setUuid(value));
  };

  useEffect(() => {
    if (!uuid) setValue("");
  }, [uuid]);

  return (
    <Container maxWidth={"sm"} style={{ marginTop: "2rem" }}>
      <FormControl fullWidth>
        <InputLabel id="purchase-order-select">Select Purchase Order</InputLabel>
        <Select
          labelId="purchase-order-select"
          id="purchase-order-select"
          label="Purchase orders"
          value={value}
          onChange={onChange}
        >
          {names.map((name) => {
            return (
              <MenuItem key={name.uuid} value={name.uuid}>
                {name.poNumber}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Container>
  );
};

export default PurchaseOrderSelect;
