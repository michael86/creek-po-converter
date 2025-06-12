import { Container } from "@mui/material";
import PurchaseOrderSelect from "../components/purchaseOrderTable/purchaseOrderSelect";
import { useAppSelector } from "../store";

import PurchaseOrderTable from "../components/purchaseOrderTable";

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
