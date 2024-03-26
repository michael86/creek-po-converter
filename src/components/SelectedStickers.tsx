import StickerLocation from "./StickerLocation";
import { useEffect, useState } from "react";
import { getDate } from "../utils";
import StickerButtons from "./StickerButtons";

type Props = {
  selectedStickers: { purchaseOrder: string; orderRef: string; partNumbers: [[string, number]] };
};

const SelectedStickers = ({ selectedStickers }: Props) => {
  const [qty, setQty] = useState<{ [key: string]: number[] }>({});
  useEffect(() => {
    selectedStickers.partNumbers.forEach((part) => {
      qty[part[0]] = [part[1]];
      setQty(qty);
    });
  }, [selectedStickers, qty]);

  console.log(selectedStickers);

  return (
    <div className="sticker-container">
      {selectedStickers.partNumbers.map((part, index) => (
        <div key={index} className="sticker">
          <p style={{ textTransform: "uppercase" }}>{part[0]}</p>
          <p style={{ textTransform: "uppercase" }}>PO: {selectedStickers.purchaseOrder}</p>
          <p style={{ textTransform: "uppercase" }}>{getDate()}</p>
          <p style={{ textTransform: "uppercase" }}>QTY: {part[1]}</p>
          <p style={{ textTransform: "uppercase" }}>REF: {selectedStickers.orderRef}</p>
          <StickerLocation />
          {index !== selectedStickers.partNumbers.length - 1 && (
            <div style={{ breakAfter: "page" }}></div>
          )}
          <StickerButtons qty={qty} part={part} setQty={setQty} />
        </div>
      ))}
    </div>
  );
};

export default SelectedStickers;
