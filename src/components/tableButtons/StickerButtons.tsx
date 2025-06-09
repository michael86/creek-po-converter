import SubmitParcels from "./SubmitParcels";
import SelectLocation from "./SelectLocation";
import PartialConfirm from "./PartialConfirm";

import "../../styles/sticker_buttons.css";
type Props = {
  addToPrint: Function;
  index: number;
  isReceived: boolean;
};

const StickerButtons: React.FC<Props> = ({ addToPrint, index, isReceived }) => {
  return (
    <span className="no-print button-container">
      {!isReceived ? (
        <>
          <SubmitParcels index={index} />
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
