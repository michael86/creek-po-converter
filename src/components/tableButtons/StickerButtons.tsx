import { useAppSelector } from "../../hooks";
import SubmitParcels from "./SubmitParcels";
import SelectLocation from "./SelectLocation";
import PartialConfirm from "./PartialConfirm";

import "../../styles/sticker_buttons.css";
type Props = {
  name: string;
  addToPrint: Function;
  index: number;
};

const StickerButtons: React.FC<Props> = ({ name, addToPrint, index }) => {
  const { order } = useAppSelector((state) => state.purchase);

  const part = order!.partNumbers[index];
  const totalOrdered = part.totalOrdered;
  const totalReceived = part.partsReceived.reduce((a, b) => a + b.amountReceived, 0);

  return (
    <span className="no-print button-container">
      {totalOrdered - totalReceived > 0 ? (
        <>
          <SubmitParcels name={name} index={index} />
          <hr style={{ border: "solid black 1px" }} />
          <SelectLocation index={index} />
          <hr style={{ border: "solid black 1px" }} />
          <PartialConfirm index={index} />
        </>
      ) : (
        <button onClick={() => addToPrint()}>Add to Print</button>
      )}
    </span>
  );
};

export default StickerButtons;
