import { getDate } from "../utils";
import StickerLocation from "./StickerLocation";
import StickerButtons from "./tableButtons/StickerButtons";
import { useState } from "react";

import { useAppDispatch } from "../hooks";
import { setToast } from "../slices/alert";
import { PartNumber } from "../slices/purchaseOrders";

type Props = {
  qty: number;
  isReceived: boolean;
  part: PartNumber;
  date?: number;
  index: number;
};

const StickerRow = ({ qty, isReceived, part, date, index }: Props) => {
  const [print, setPrint] = useState(false);
  const dispatch = useAppDispatch();

  const totalReceived = part.partsReceived.reduce((a, b) => a + b.amountReceived, 0);

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
        <td className="sticker-part">{part.name}</td>
        <td className="sticker-description">{part.description}</td>
        <td className="sticker-qty">
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
        <td className="due-date" style={{ textTransform: "uppercase" }}>
          <span className="show-print">Due: </span>
          {getDate(part.dateDue)}
        </td>
        <td className="date-received" style={{ textTransform: "uppercase" }}>
          <span className="show-print">Received: </span>
          {getDate(date)}
        </td>

        <StickerLocation location={part.location} />

        <td className="table-buttons pagebreak">
          <StickerButtons name={part.name} addToPrint={addToPrint} index={index} />
        </td>
      </tr>
    </>
  );
};

export default StickerRow;
