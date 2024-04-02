import { getDate } from "../utils";
import StickerLocation from "./StickerLocation";
import StickerButtons from "./StickerButtons";
import { useState } from "react";
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
  const [location, setLocation] = useState("");

  return (
    <>
      <tr className={`sticker`} style={{ backgroundColor: backgroundColor }}>
        <td style={{ textTransform: "uppercase" }}>{name}</td>
        <td style={{ textTransform: "uppercase" }}>{description}</td>
        <td style={{ textTransform: "uppercase" }}>QTY: {qty}</td>
        <td style={{ textTransform: "uppercase" }}>PO: {purchaseOrder}</td>
        <td style={{ textTransform: "uppercase" }}>REF: {orderRef}</td>
        <td style={{ textTransform: "uppercase" }}>{getDate()}</td>
        <td style={{ textTransform: "uppercase" }} className="no-print">
          No
        </td>

        <StickerLocation location={location} />
        <div className="pagebreak" />
        <td className="table-buttons">
          <StickerButtons
            qty={total}
            index={index}
            partNumbers={partNumbers}
            setLocation={setLocation}
          />
        </td>
      </tr>
    </>
  );
};

export default Sticker;
