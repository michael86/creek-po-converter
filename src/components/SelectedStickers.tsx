import Sticker from "./Sticker";
import { getRandomColor } from "../utils";
import { useAppSelector } from "../hooks";

const SelectedStickers = () => {
  const { partNumbers, purchaseOrder, orderRef } = useAppSelector((state) => state.purchase);

  return (
    <div className="sticker-container">
      {partNumbers.map((part, index) => {
        const backgroundColor = Array.isArray(part[1]) ? getRandomColor() : `rgb(255,255,255)`;
        return Array.isArray(part[1]) ? (
          part[1].map((qty) => {
            return (
              <Sticker
                purchaseOrder={purchaseOrder}
                orderRef={orderRef}
                name={part[0]}
                description={part[2]}
                qty={qty}
                index={index}
                key={index}
                partNumbers={partNumbers}
                backgroundColor={backgroundColor}
                total={part[1]}
              />
            );
          })
        ) : (
          <Sticker
            purchaseOrder={purchaseOrder}
            orderRef={orderRef}
            name={part[0]}
            description={part[2]}
            qty={part[1]}
            key={index}
            index={index}
            partNumbers={partNumbers}
            total={part[1]}
          />
        );
      })}
    </div>
  );
};

export default SelectedStickers;
