import { getDate, sumUpParcels } from "../utils";
import StickerLocation from "./StickerLocation";
import StickerButtons from "./StickerButtons";
import { useState } from "react";
import { PartNumber } from "../slices/purchaseOrders";

type Props = {
  backgroundColor?: string;
  purchaseOrder: string;
  orderRef: string;
  part: PartNumber;
};

const Sticker = ({
  purchaseOrder,
  orderRef,
  backgroundColor = "rgb(255,255,255)",
  part,
}: Props) => {
  const [location, setLocation] = useState("");
  const { partsReceived, totalOrdered } = part;

  const totalReceived = partsReceived
    ? partsReceived.reduce((partialSum, value) => partialSum + value, 0)
    : 0;

  const complete = totalReceived >= totalOrdered;
  backgroundColor = complete ? "green" : backgroundColor;

  return (
    <>
      <tr
        className={`sticker${complete && " no-print"} `}
        style={{ backgroundColor: backgroundColor }}
      >
        <td style={{ textTransform: "uppercase" }}>{part.name}</td>
        <td style={{ textTransform: "uppercase" }}>{part.description}</td>
        <td style={{ textTransform: "uppercase" }}>
          QTY:{part.totalOrdered - totalReceived}{" "}
          {part.partial === 1 ? (
            <>
              <hr className="no-print" style={{ border: "solid black 1px" }} />
              <div className="no-print" style={{ fontSize: "0.7rem" }}>
                Total ordered: {part.totalOrdered}
              </div>
              <div className="no-print" style={{ fontSize: "0.7rem" }}>
                Total reveived: {totalReceived}
              </div>
            </>
          ) : null}
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
          {!complete ? (
            <StickerButtons
              qty={part.totalOrdered}
              setLocation={setLocation}
              purchaseOrder={purchaseOrder}
              partial={part.partial}
              part={part}
            />
          ) : (
            <p className="no-print">Order Complete</p>
          )}
        </td>
      </tr>
    </>
  );
};

export default Sticker;
