import { getDate } from "../utils";
import StickerLocation from "./StickerLocation";
import StickerButtons from "./tableButtons/StickerButtons";
import { useState } from "react";

import { useAppDispatch } from "../hooks";
import { setToast } from "../slices/alert";
import { PartNumber, PurchaseOrder } from "../slices/purchaseOrders";

type Props = {
  qty: number;
  isReceived: boolean;
  order: PurchaseOrder;
  part: PartNumber;
};

const StickerRow = ({ qty, isReceived, order, part }: Props) => {
  const [location, setLocation] = useState("");
  const [print, setPrint] = useState(false);
  const dispatch = useAppDispatch();

  const totalReceived = part.partsReceived.reduce((a, b) => a + b, 0);

  const addToPrint = () => {
    setPrint(true);
    dispatch(setToast({ show: true, type: "success", message: `${part.name} is now printable` }));
  };

  return (
    <>
      <tr
        className={`sticker${isReceived && !print ? " no-print" : ""} `}
        style={{ backgroundColor: isReceived ? "green" : "white" }}
      >
        <td style={{ textTransform: "uppercase" }}>{part.name}</td>
        <td style={{ textTransform: "uppercase" }}>{part.description}</td>
        <td style={{ textTransform: "uppercase" }}>
          QTY:{qty}
          <>
            <hr className="no-print" style={{ border: "solid black 1px" }} />
            <div className="no-print" style={{ fontSize: "0.7rem" }}>
              Total ordered: {part.totalOrdered}
            </div>
            <div className="no-print" style={{ fontSize: "0.7rem" }}>
              Total received: {totalReceived}
            </div>
          </>
        </td>

        <td className="print-flex" style={{ textTransform: "uppercase" }}>
          <span className="show-print">Received: </span>
          {getDate()}
        </td>
        <td style={{ textTransform: "uppercase" }} className="no-print">
          No
        </td>

        <StickerLocation location={location} />

        <td className="table-buttons pagebreak">
          <StickerButtons setLocation={setLocation} name={part.name} addToPrint={addToPrint} />
        </td>
      </tr>
    </>
  );
};

export default StickerRow;
