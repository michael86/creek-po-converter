import { getDate } from "../utils";
import StickerLocation from "./StickerLocation";
import StickerButtons from "./StickerButtons";
import { Dispatch, SetStateAction } from "react";

type _Sticker = [string, number | number[], string];

type Props = {
  selectedStickers: {
    purchaseOrder: string;
    orderRef: string;
    partNumbers: [[string, number | number[], string]];
  };
  setStickerByQty: Dispatch<SetStateAction<[_Sticker]>>;
  part: _Sticker;
  index: number;
  qty?: number;
  backgroundColor?: string;
};

const Sticker = ({
  selectedStickers,
  setStickerByQty,
  part,
  index,
  qty,
  backgroundColor,
}: Props) => {
  const { orderRef, partNumbers, purchaseOrder } = selectedStickers;

  return (
    <div className={`sticker`} style={{ backgroundColor: backgroundColor }}>
      <p style={{ textTransform: "uppercase" }}>{part[0]}</p>
      <p style={{ textTransform: "uppercase" }}>PO: {purchaseOrder}</p>
      <p style={{ textTransform: "uppercase" }}>{getDate()}</p>
      <p style={{ textTransform: "uppercase" }}>QTY: {qty || part[1]}</p>
      <p style={{ textTransform: "uppercase" }}>REF: {orderRef}</p>
      <p style={{ textTransform: "uppercase" }}>DESC: {part[2]}</p>

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
