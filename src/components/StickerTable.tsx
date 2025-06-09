import StickerRow from "./StickerRow";
import { useAppSelector } from "../hooks";
import "../styles/table.css";
import { ReactElement } from "react";

const StickerTable = () => {
  const { order } = useAppSelector((state) => state.purchase);

  return order ? (
    <>
      <h2 className="table-purchase no-print">
        Purchase Order: {order.purchaseOrder}
      </h2>
      <h2 className="table-order no-print">Order Ref: {order.orderRef}</h2>
      <table className="sticker-container">
        <thead className="no-print">
          <tr>
            <th>part number</th>
            <th>description</th>
            <th>count</th>
            <th>date due</th>
            <th>date received</th>
            <th>Location</th>
            <th>buttons</th>
          </tr>
        </thead>
        <tbody>
          {order.partNumbers
            .map((entry, index) => {
              const stickers: ReactElement[] = [];

              const { name, totalOrdered, partsReceived } = entry;
              const totalReceived = partsReceived.reduce(
                (a, b) => a + b.amountReceived,
                0
              );
              const amountWaited = totalOrdered - totalReceived;

              partsReceived.forEach((received, index) => {
                stickers.push(
                  <StickerRow
                    poNumber={order.purchaseOrder}
                    key={`${index}-${name}_${received}`} // Ensure unique keys when mapping over arrays
                    qty={received.amountReceived}
                    isReceived={true}
                    part={entry}
                    date={received.dateReceived}
                    index={index}
                  />
                );
              });

              amountWaited > 0 &&
                stickers.push(
                  <StickerRow
                    poNumber={order.purchaseOrder}
                    key={`${index}-${name}_${amountWaited}`} // Ensure unique keys when mapping over arrays
                    qty={totalOrdered - totalReceived}
                    isReceived={false}
                    part={entry}
                    index={index}
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
