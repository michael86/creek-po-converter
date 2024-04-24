import StickerRow from "./StickerRow";
import { useAppSelector } from "../hooks";
import "../styles/table.css";
import { ReactElement } from "react";

const StickerTable = () => {
  const { order } = useAppSelector((state) => state.purchase);

  return order ? (
    <>
      <h2 className="table-purchase">Purchase Order: {order.purchaseOrder}</h2>
      <h2 className="table-order">Order Ref: {order.orderRef}</h2>
      <table className="sticker-container">
        <thead className="no-print">
          <tr>
            <th>part number</th>
            <th>description</th>
            <th>count</th>
            <th>date received</th>
            <th>Location</th>
            <th>buttons</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(order.partNumbers)
            .map((key, index) => {
              const stickers: ReactElement[] = [];

              const { name, totalOrdered, partsReceived } = order.partNumbers[key];

              const totalReceived = partsReceived.reduce((a, b) => a + b, 0);
              const amountWaited = totalOrdered - totalReceived;

              console.log("parts received", partsReceived);
              partsReceived.forEach((received, index) => {
                stickers.push(
                  <StickerRow
                    key={`${index}-${name}_${received}`} // Ensure unique keys when mapping over arrays
                    qty={received}
                    isReceived={true}
                    order={order}
                    part={order.partNumbers[key]}
                  />
                );
              });

              amountWaited > 0 &&
                stickers.push(
                  <StickerRow
                    key={`${index}-${name}_${amountWaited}`} // Ensure unique keys when mapping over arrays
                    qty={totalOrdered - totalReceived}
                    isReceived={false}
                    order={order}
                    part={order.partNumbers[key]}
                  />
                );
              return stickers;
            })
            .flat()}
        </tbody>
      </table>
    </>
  ) : null;
};

export default StickerTable;
