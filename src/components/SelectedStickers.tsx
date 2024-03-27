import { useState } from "react";
import Sticker from "./Sticker";
import { getRandomColor } from "../utils";

type Props = {
  selectedStickers: {
    purchaseOrder: string;
    orderRef: string;
    partNumbers: [[string, number | number[], string]];
  };
};

const SelectedStickers = ({ selectedStickers }: Props) => {
  const { partNumbers } = selectedStickers;
  const [stickerByQty, setStickerByQty] = useState(partNumbers);

  return (
    <div className="sticker-container">
      {stickerByQty.map((part, index) => {
        const backgroundColor = Array.isArray(part[1]) ? getRandomColor() : `rgb(255,255,255)`;
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
                backgroundColor={backgroundColor}
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
