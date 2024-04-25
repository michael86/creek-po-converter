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
};

const StickerRow = ({ qty, isReceived, part, date }: Props) => {
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

        <td className="date-received" style={{ textTransform: "uppercase" }}>
          <span className="show-print">Received: </span>
          {getDate(date)}
        </td>

        <StickerLocation location={part.location} />

        <td className="table-buttons pagebreak">
          <StickerButtons name={part.name} addToPrint={addToPrint} />
        </td>
      </tr>
    </>
  );
};

export default StickerRow;
