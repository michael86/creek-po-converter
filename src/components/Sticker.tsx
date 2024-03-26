import { getDate } from "../utils";
import StickerLocation from "./StickerLocation";
import StickerButtons from "./StickerButtons";
import { Dispatch, SetStateAction } from "react";

type Sticker = [string, number | number[]];

type Props = {
  selectedStickers: {
    purchaseOrder: string;
    orderRef: string;
    partNumbers: [[string, number | number[]]];
  };
  setStickerByQty: Dispatch<SetStateAction<[Sticker]>>;
  part: Sticker;
  index: number;
  qty?: number;
};

const Sticker = ({ selectedStickers, setStickerByQty, part, index, qty }: Props) => {
  const { orderRef, partNumbers, purchaseOrder } = selectedStickers;

  return (
    <div className="sticker">
      <p style={{ textTransform: "uppercase" }}>{part[0]}</p>
      <p style={{ textTransform: "uppercase" }}>PO: {purchaseOrder}</p>
      <p style={{ textTransform: "uppercase" }}>{getDate()}</p>
      <p style={{ textTransform: "uppercase" }}>QTY: {qty || part[1]}</p>
      <p style={{ textTransform: "uppercase" }}>REF: {orderRef}</p>

      <StickerLocation />
      {index !== selectedStickers.partNumbers.length - 1 && (
        <div style={{ breakAfter: "page" }}></div>
      )}

      <StickerButtons
        partNumbers={partNumbers}
        setStickerByQty={setStickerByQty}
        targetPart={part[0]}
      />
    </div>
  );
};

export default Sticker;
