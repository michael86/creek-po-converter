import jsPDF from "jspdf";
import { HexSticker } from "../types/stickers";

export const generateHexStickersPdf = (
  data: HexSticker[],
  format: "hex" | "decimal"
) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  // Adjusted for HP LaserJet M570dn
  const labelWidth = 17.78;
  const labelHeight = 10.0;
  const horizontalPitch = 19.05; // label + gap
  const verticalPitch = 10.0;
  const labelsPerRow = 10;
  const labelsPerCol = 27;

  // Add 4.23mm compensation for HP non-printable area
  const leftMargin = 4.2 + 4.23; // = 8.43 mm
  const topMargin = 12.7 + 4.23; // = 16.93 mm

  doc.setFontSize(9);
  let index = 0;

  for (let row = 0; row < labelsPerCol; row++) {
    for (let col = 0; col < labelsPerRow; col++) {
      if (index >= data.length) break;

      const x = leftMargin + col * horizontalPitch;
      const y = topMargin + row * verticalPitch;

      const value =
        format === "decimal" ? data[index].decimal.toString() : data[index].hex;

      doc.rect(x, y, labelWidth, labelHeight); // optional border
      doc.text(value, x + labelWidth / 2, y + labelHeight / 2 + 1.5, {
        align: "center",
        baseline: "middle",
      });

      index++;
    }

    if (index >= data.length) break;
  }

  window.open(doc.output("bloburl"), "_blank");
};

export const generateHexCodes = (
  value: string,
  amount: number,
  radio: 1 | 0
): { hex: string; decimal: number }[] | undefined => {
  if (!value || !amount || typeof radio !== "number") return;

  const convertToHex = (num: number): string => num.toString(16).toUpperCase();
  const convertToDec = (hex: string): number => parseInt(hex, 16);

  const base = radio === 1 ? convertToDec(value) : parseInt(value, 10);
  if (isNaN(base)) return;

  return Array.from({ length: amount }, (_, i) => {
    const current = base + i;
    return {
      hex: convertToHex(current),
      decimal: current,
    };
  });
};
