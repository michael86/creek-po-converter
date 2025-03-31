import { Container } from "@mui/material";
import PurchaseOrderSelect from "../components/purchaseOrderSelect";
import { useAppSelector } from "../store";

import PurchaseOrderTable from "../components/PurchaseOrderTable";

const PurchaseOrder = () => {
  const uuid = useAppSelector((state) => state.purchaseOrder.uuid);

  return (
    <Container>
      <PurchaseOrderSelect />

      {uuid && <PurchaseOrderTable />}
    </Container>
  );
};

export default PurchaseOrder;
