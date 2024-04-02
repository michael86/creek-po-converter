import Sticker from "./Sticker";
import { getRandomColor } from "../utils";
import { useAppSelector } from "../hooks";
import "./styles/table.css";

const SelectedStickers = () => {
  const { order } = useAppSelector((state) => state.purchase);
  if (order && order.partNumbers) console.log("quantities ", order.partNumbers);
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
        {order && order.partNumbers
          ? Object.keys(order.partNumbers).map((key, index) => {
              const part = order.partNumbers[key];

              const backgroundColor = Array.isArray(part.quantityAwaited)
                ? getRandomColor()
                : `rgb(255,255,255)`;

              const quantities = Array.isArray(part.quantityAwaited)
                ? part.quantityAwaited
                : [part.quantityAwaited]; // Ensure quantities is always an array

              return quantities.map((qty, qtyIndex) => {
                return (
                  <Sticker
                    purchaseOrder={order.purchaseOrder}
                    orderRef={order.orderRef}
                    key={index + qtyIndex} // Ensure unique keys when mapping over arrays
                    backgroundColor={backgroundColor}
                    part={order.partNumbers[key]}
                    qty={qty}
                  />
                );
              });
            })
          : null}
      </tbody>
    </table>
  );
};

export default SelectedStickers;
