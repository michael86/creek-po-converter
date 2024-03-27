import Sticker from "./Sticker";
import { getRandomColor } from "../utils";
import { useAppSelector } from "../hooks";
import "./styles/table.css";

const SelectedStickers = () => {
  const { partNumbers, purchaseOrder, orderRef } = useAppSelector((state) => state.purchase);

  return (
    <table className="sticker-container">
      <thead className="no-print">
        <tr>
          <th>part number</th>
          <th>description</th>
          <th>count</th>
          <th>Purchase Order</th>
          <th>Work Order</th>
          <th>date received</th>
          <th>Partial Order</th>
          <th>Location</th>
          <th>buttons</th>
        </tr>
      </thead>
      <tbody>
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
      </tbody>
    </table>
  );
};

export default SelectedStickers;
