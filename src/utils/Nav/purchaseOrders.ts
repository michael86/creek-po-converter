import React from "react";
import { PurchaseOrderLabelsMap, PurchaseOrderLabel } from "../../types/labels";
import jsPDF from "jspdf";

export const genPurchaseOrderLabels = (
  labels: PurchaseOrderLabelsMap,
  setShowSnack: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (Object.keys(labels).length > 0) {
    const doc = new jsPDF({
      unit: "mm",
      format: [62, 40], // label size in mm
      orientation: "landscape",
    });

    // Flatten labels into a single array of PurchaseOrderLabel
    const allLabels: PurchaseOrderLabel[] = Object.values(labels).flatMap((historyMap) =>
      Object.values(historyMap)
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
    return;
  }
};
