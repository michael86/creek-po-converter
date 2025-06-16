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
        action: () => {
          if (Object.keys(purchaseOrder.labels).length > 0) {
            const doc = new jsPDF({
              unit: "mm",
              format: [62, 40], // label size in mm
              orientation: "landscape",
            });

            // Flatten labels into a single array of PurchaseOrderLabel
            const allLabels: PurchaseOrderLabel[] = Object.values(purchaseOrder.labels).flatMap(
              (historyMap) => Object.values(historyMap)
            );

            allLabels.forEach((value, index) => {
              if (index > 0) doc.addPage(); // new 62×40 mm page
              const pageWidth = doc.internal.pageSize.getWidth();

              const margin = 2; // 2 mm left/right margin
              const maxWidth = 62 - margin * 2;
              let y = 6;

              doc.setFontSize(12);
              doc.text(value.partNumber, pageWidth / 2, y, { align: "center" });
              doc.text(value.purchaseOrder, pageWidth / 2, (y += 5), { align: "center" });
              doc.text(`Qty: ${value.quantityReceived}`, pageWidth / 2, (y += 5), {
                align: "center",
              });
              y += 5;

              const desc = `${value.description}`;
              const wrapped = doc.splitTextToSize(desc, maxWidth);
              doc.text(wrapped, pageWidth / 2, y, { align: "center" });
              y += wrapped.length * 2.5;

              doc.text(new Date(value.dateReceived).toLocaleDateString(), pageWidth / 2, (y += 5), {
                align: "center",
              });
              doc.text(value.storageLocation || "Location", pageWidth / 2, (y += 5), {
                align: "center",
              });
            });

            const blob = doc.output("blob");
            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");
          } else {
            setShowSnack(true);
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
