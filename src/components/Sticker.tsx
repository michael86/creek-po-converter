import { getDate } from "../utils";
import StickerLocation from "./StickerLocation";
import StickerButtons from "./StickerButtons";

import { Parts } from "../slices/purchaseOrders";

type Props = {
  purchaseOrder: string;
  orderRef: string;
  name: string;
  description: string;
  qty: number;
  backgroundColor?: string;
  index: number;
  partNumbers: Parts;
  total: number | number[];
};

const Sticker = ({
  name,
  qty,
  description,
  purchaseOrder,
  orderRef,
  backgroundColor = "rgb(255,255,255)",
  index,
  partNumbers,
  total,
}: Props) => {
  return (
    <div className={`sticker`} style={{ backgroundColor: backgroundColor }}>
      <p style={{ textTransform: "uppercase" }}>{name}</p>
      <p style={{ textTransform: "uppercase" }}>PO: {purchaseOrder}</p>
      <p style={{ textTransform: "uppercase" }}>{getDate()}</p>
      <p style={{ textTransform: "uppercase" }}>QTY: {qty}</p>
      <p style={{ textTransform: "uppercase" }}>REF: {orderRef}</p>
      <p style={{ textTransform: "uppercase" }}>{description}</p>

      <StickerLocation />

      <StickerButtons qty={total} index={index} partNumbers={partNumbers} />
    </div>
  );
};

export default Sticker;
