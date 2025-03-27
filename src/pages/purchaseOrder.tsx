import { Container } from "@mui/material";
import PurchaseOrderSelect from "../components/purchaseOrderSelect";
import { useAppSelector } from "../store";

import PurchaseOrderTable from "../components/PurchaseOrderTable";
import PurchaseOrderEditButtons from "../components/PurchaseOrderEditButtons";

const PurchaseOrder = () => {
  const uuid = useAppSelector((state) => state.purchaseOrder.uuid);
  const role = useAppSelector((state) => state.auth.role) ?? 1;

  return (
    <Container>
      {role >= 3 && uuid && <PurchaseOrderEditButtons />}
      <PurchaseOrderSelect />

      {uuid && <PurchaseOrderTable />}
    </Container>
  );
};

export default PurchaseOrder;
