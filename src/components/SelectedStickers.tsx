import StickerLocation from "./StickerLocation";
import { getDate } from "../utils";

type Props = {
  selectedStickers: { purchaseOrder: string; orderRef: string; partNumbers: (string | number)[][] };
};

const SelectedStickers = ({ selectedStickers }: Props) => {
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
          <button className="no-print">Change QTY</button>
        </div>
      ))}
    </div>
  );
};

export default SelectedStickers;
