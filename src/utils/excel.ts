import * as XLSX from "xlsx";
import { ViasatSticker } from "../types/stickers";

export const parseViasatData = (arrayBuffer: ArrayBuffer): ViasatSticker[] => {
  const workbook = XLSX.read(arrayBuffer, { type: "binary" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const sheetData = XLSX.utils.sheet_to_json(sheet);

  if (sheetData.length === 0) {
    throw new Error(
      "The selected file is empty or does not contain valid data."
    );
  }

  return sheetData.map((row: any) => ({
    depotPin: row["Depot"] as number,
    masterPin: row["Master"] as number,
    serialNumber: row["Serial Number"] as string,
    userPin: row["User"] as number,
  }));
};
