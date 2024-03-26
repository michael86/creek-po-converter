import { useState } from "react";
import Sticker from "./Sticker";

type Props = {
  selectedStickers: {
    purchaseOrder: string;
    orderRef: string;
    partNumbers: [[string, number | number[]]];
  };
};

const SelectedStickers = ({ selectedStickers }: Props) => {
  const { partNumbers } = selectedStickers;
  const [stickerByQty, setStickerByQty] = useState(partNumbers);

  return (
    <div className="sticker-container">
      {stickerByQty.map((part, index) => {
        return Array.isArray(part[1]) ? (
          part[1].map((qty) => {
            return (
              <Sticker
                selectedStickers={selectedStickers}
                setStickerByQty={setStickerByQty}
                part={part}
                index={index}
                key={index}
                qty={qty}
              />
            );
          })
        ) : (
          <Sticker
            selectedStickers={selectedStickers}
            setStickerByQty={setStickerByQty}
            part={part}
            index={index}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default SelectedStickers;
