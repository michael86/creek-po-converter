import { Container } from "@mui/material";
import { useAppSelector } from "../store";
import PurchaseOrderTable from "../components/purchaseOrderTable/";
import PurchaseOrderSelect from "../components/purchaseOrderTable/purchaseOrderSelect";

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
