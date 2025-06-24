import jsPDF from "jspdf";
import { ViasatSticker } from "../types/stickers";

export const generateViasatPdf = (data: ViasatSticker[]) => {
  const doc = new jsPDF("portrait", "mm", "a4");

  const stickerWidth = 38.1;
  const stickerHeight = 21.2;
  const columnGap = 2.5;
  const cols = 5;
  const rows = 13;
  const leftMargin = 7;
  const topMargin = 11;

  let col = 0;
  let row = 0;

  const drawSticker = (x: number, y: number, lines: string[]) => {
    doc.setFontSize(8);
    lines.forEach((line, i) => {
      const isMiddle = i === 1;
      doc.setFont("helvetica", isMiddle ? "bold" : "normal");
      doc.text(line, x + stickerWidth / 2, y + 6 + i * 5, {
        align: "center",
      });
    });
  };

  const safe = (val: any) => (val != null ? String(val) : "");
  const stickers: string[][] = [];

  for (const { serialNumber, masterPin } of data) {
    const group = [safe(serialNumber), "master pin", masterPin.toString()];
    stickers.push(group, group);
  }
  for (const { masterPin, depotPin } of data) {
    const group = [safe(masterPin), "Depot Pin", depotPin.toString()];
    stickers.push(group, group);
  }
  for (const { serialNumber, userPin } of data) {
    const group = [safe(serialNumber), "user pin", userPin.toString()];
    stickers.push(group, group);
  }

  for (let i = 0; i < stickers.length; i++) {
    if (row === rows) {
      doc.addPage();
      row = 0;
    }
    const x = leftMargin + col * (stickerWidth + columnGap);
    const y = topMargin + row * stickerHeight;
    drawSticker(x, y, stickers[i]);
    col++;
    if (col === cols) {
      col = 0;
      row++;
    }
  }

  doc.output("dataurlnewwindow");
};
