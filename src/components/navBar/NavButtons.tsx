import { Button } from "@mui/material";
import { useLocation } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import { isKeyOf } from "../../utils/typeGuards";
import { useDeletePurchaseOrder } from "../../hooks/usePurchaseOrderMutations";
import { ButtonSchema } from "../../types/navBar";
import { setEditMode } from "../../store/slices/purchaseOrder";
import SnackBar from "../SnackBar";
import { useState } from "react";
import jsPDF from "jspdf";
import { PurchaseOrderLabel } from "../../types/labels";
import { genPurchaseOrderLabels } from "../../utils/Nav/purchaseOrders";

export default function NavButtons() {
  const [showSnack, setShowSnack] = useState<boolean>(false);

  const { pathname } = useLocation();
  const pathKey = pathname.replace(/[-/]/g, "");
  const purchaseOrder = useAppSelector((s) => s.purchaseOrder);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  //Have to call hooks inside component to prevent react from moaning
  const deletePO = useDeletePurchaseOrder();

  const buttonSchema: ButtonSchema = {
    purchaseorders: [
      {
        role: 3,
        label: "Edit",
        action: () => {
          dispatch(setEditMode(!purchaseOrder.editMode));
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

      {
        role: 3,
        label: "print",
        action: () => genPurchaseOrderLabels(purchaseOrder.labels, setShowSnack),
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
          <>
            {auth.role && auth.role >= cfg.role && (
              <Button key={idx} variant="outlined" color="inherit" onClick={cfg.action} sx={cfg.sx}>
                {cfg.label}
              </Button>
            )}

            {showSnack && <SnackBar setShowSnack={setShowSnack} message="No labels to Print" />}
          </>
        );
      })}
    </>
  );
}
