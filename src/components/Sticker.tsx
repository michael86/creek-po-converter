import { getDate } from "../utils";
import StickerLocation from "./StickerLocation";
import StickerButtons from "./StickerButtons";
import { useState } from "react";

type Props = {
  backgroundColor?: string;
  qty: number;
  purchaseOrder: string;
  orderRef: string;
  part: {
    name: string;
    quantityAwaited: number[];
    partial: 1 | 0;
    totalOrdered: number;
    description: string;
  };
};

const Sticker = ({
  purchaseOrder,
  orderRef,
  backgroundColor = "rgb(255,255,255)",
  part,
  qty,
}: Props) => {
  const [location, setLocation] = useState("");

  return (
    <>
      <tr className={`sticker`} style={{ backgroundColor: backgroundColor }}>
        <td style={{ textTransform: "uppercase" }}>{part.name}</td>
        <td style={{ textTransform: "uppercase" }}>{part.description}</td>
        <td style={{ textTransform: "uppercase" }}>
          QTY: {qty}{" "}
          {part.partial && (
            <div style={{ fontSize: "0.7rem" }}>Total ordered: {part.totalOrdered}</div>
          )}
        </td>
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
            qty={part.totalOrdered}
            setLocation={setLocation}
            purchaseOrder={purchaseOrder}
            partial={part.partial}
            part={part}
          />
        </td>
      </tr>
    </>
  );
};

export default Sticker;
