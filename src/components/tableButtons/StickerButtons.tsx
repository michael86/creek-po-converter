import { Dispatch, SetStateAction, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import SubmitParcels from "./SubmitParcels";
import SelectLocation from "./SelectLocation";
import PartialConfirm from "./PartialConfirm";

import "../../styles/sticker_buttons.css";
type Props = {
  setLocation: Dispatch<SetStateAction<string>>;
  name: string;
  addToPrint: Function;
};

const StickerButtons: React.FC<Props> = ({ setLocation, name, addToPrint }) => {
  const { order } = useAppSelector((state) => state.purchase);

  const part = order!.partNumbers[name];
  const totalOrdered = part.totalOrdered;
  const totalReceived = part.partsReceived.reduce((a, b) => a + b, 0);

  return (
    <span className="no-print button-container">
      {totalOrdered - totalReceived > 0 ? (
        <>
          <SubmitParcels name={name} />
          <hr style={{ border: "solid black 1px" }} />
          <SelectLocation part={name} order={order!.purchaseOrder} setLocation={setLocation} />
          <hr style={{ border: "solid black 1px" }} />
          <PartialConfirm name={name} />
        </>
      ) : (
        <button onClick={() => addToPrint()}>Add to Print</button>
      )}
    </span>
  );
};

export default StickerButtons;
