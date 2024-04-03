import { getDate } from "../utils";
import StickerLocation from "./StickerLocation";
import StickerButtons from "./StickerButtons";
import { useState } from "react";
import { PartNumber } from "../slices/purchaseOrders";
import { useAppDispatch } from "../hooks";
import { setToast } from "../slices/alert";

type Props = {
  backgroundColor?: string;
  purchaseOrder: string;
  orderRef: string;
  part: PartNumber;
  qty: number;
  complete: boolean;
};

const Sticker = ({
  purchaseOrder,
  orderRef,
  backgroundColor = "rgb(255,255,255)",
  part,
  qty,
  complete,
}: Props) => {
  const [location, setLocation] = useState("");
  const [print, setPrint] = useState(false);
  const { partsReceived } = part;
  const dispatch = useAppDispatch();
  const totalReceived = partsReceived
    ? partsReceived.reduce((partialSum, value) => partialSum + value, 0)
    : 0;

  backgroundColor = complete ? "green" : backgroundColor;

  const addToPrint = () => {
    setPrint(true);
    dispatch(setToast({ show: true, type: "success", message: `${part.name} is now printable` }));
  };

  return (
    <>
      <tr
        className={`sticker${complete && !print ? " no-print" : ""} `}
        style={{ backgroundColor: backgroundColor }}
      >
        <td style={{ textTransform: "uppercase" }}>{part.name}</td>
        <td style={{ textTransform: "uppercase" }}>{part.description}</td>
        <td style={{ textTransform: "uppercase" }}>
          QTY:{qty}
          {part.partial === 1 || complete ? (
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
          <StickerButtons
            qty={part.totalOrdered}
            setLocation={setLocation}
            purchaseOrder={purchaseOrder}
            partial={part.partial}
            part={part}
            complete={complete}
            addToPrint={addToPrint}
          />
        </td>
      </tr>
    </>
  );
};

export default Sticker;
