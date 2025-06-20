import { Container } from "@mui/material";
import { useAppSelector } from "../store";
import PurchaseOrderTable from "../components/purchaseOrderTable/Index";
import PurchaseOrderSelect from "../components/purchaseOrderTable/PurchaseOrderSelect";

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
