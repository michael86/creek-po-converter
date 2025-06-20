import jsPDF from "jspdf";
import { PurchaseOrderLabelsMap, PurchaseOrderLabel } from "../../types/labels";

export const genPurchaseOrderLabels = (
  name: string,
  labels: PurchaseOrderLabelsMap,
  setShowSnack: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const allLabels: PurchaseOrderLabel[] = Object.values(labels);

  if (allLabels.length === 0) {
    setShowSnack(true);
    return;
  }

  const doc = new jsPDF({
    unit: "mm",
    format: [62, 40], // label size in mm
    orientation: "landscape",
  });

  allLabels.forEach((value, index) => {
    if (index > 0) doc.addPage();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 2;
    const maxWidth = 62 - margin * 2;
    let y = 6;

    doc.setFontSize(12);
    doc.text(value.partNumber, pageWidth / 2, y, { align: "center" });
    doc.text(name, pageWidth / 2, (y += 5), { align: "center" });
    doc.text(`Qty: ${value.quantityReceived}`, pageWidth / 2, (y += 5), {
      align: "center",
    });
    y += 5;

    const wrapped = doc.splitTextToSize(value.description, maxWidth);
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
};
