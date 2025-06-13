import { Button } from "@mui/material";
import { useLocation } from "@tanstack/react-router";
import { useAppSelector } from "../../store";
import { isKeyOf } from "../../utils/typeGuards";
import { useDeletePurchaseOrder } from "../../hooks/usePurchaseOrderMutations";
import { ButtonSchema } from "../../types/navBar";

export default function NavButtons() {
  const { pathname } = useLocation();
  const pathKey = pathname.replace(/[-/]/g, "");
  const purchaseOrder = useAppSelector((s) => s.purchaseOrder);
  const auth = useAppSelector((state) => state.auth);

  //Have to call hooks inside component to prevent react from moaning
  const deletePO = useDeletePurchaseOrder();

  const buttonSchema: ButtonSchema = {
    purchaseorders: [
      {
        role: 3,
        label: "Edit",
        action: () => {
          //Add set Edit mode to redux store and set state here
        },
        sx: { mr: 2.5 },
      },

      {
        role: 3,
        label: "Delete",
        action: () => {
          if (purchaseOrder.uuid) {
            deletePO.mutate(purchaseOrder.uuid);
          }
        },
        sx: { mr: 2.5 },
      },
    ],
  };

  if (!isKeyOf(buttonSchema, pathKey)) return null;
  if (pathKey === "purchaseorders" && !purchaseOrder.items) return null;

  return (
    <>
      {buttonSchema[pathKey].map((cfg, idx) => {
        return (
          auth.role &&
          auth.role >= cfg.role && (
            <Button key={idx} variant="outlined" color="inherit" onClick={cfg.action} sx={cfg.sx}>
              {cfg.label}
            </Button>
          )
        );
      })}
    </>
  );
}
