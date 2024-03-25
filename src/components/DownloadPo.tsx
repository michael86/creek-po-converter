import axios from "../utils/interceptors";
import { useEffect, useState } from "react";

type PurchaseOrders = { purchase_order: string }[];
type Stickers = {
  purchaseOrder: string;
  orderRef: string;
  partNumbers: (string | number)[][];
};
const DownloadPo = () => {
  const [fetched, setFetched] = useState<PurchaseOrders | null>(null);
  const [stickers, setStickers] = useState<Stickers | null>(null);

  useEffect(() => {
    (async () => {
      const purchaseOrders = await axios.get("pdf/fetch");
      if (purchaseOrders.data.status !== 1)
        console.log("failed to get purchase orders ", purchaseOrders);

      setFetched(purchaseOrders.data.data);
    })();
  }, []);

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const res = await axios.get(`pdf/fetch/${e.target.value}`);
    if (!res.data.data) return;
    setStickers(res.data.data);
  };

  return (
    <>
      {fetched && (
        <div className="no-print">
          <p>Select Po to Download</p>
          <select onChange={onChange}>
            <option>Select PO</option>
            {fetched.map((purchase) => (
              <option key={purchase.purchase_order} value={purchase.purchase_order}>
                {purchase.purchase_order}
              </option>
            ))}
          </select>
        </div>
      )}

      {!fetched && <p>Fetching orders</p>}

      {stickers && (
        <>
          {stickers.partNumbers.map((part) => {
            return (
              <>
                <p style={{ textTransform: "uppercase" }}>PO: {stickers.purchaseOrder}</p>
                <p style={{ textTransform: "uppercase" }}>OR: {stickers.orderRef}</p>
                <p style={{ textTransform: "uppercase" }}>PN: {part[0]}</p>
                <p style={{ textTransform: "uppercase" }}>QTY: {part[1]}</p>
                <div style={{ breakAfter: "page" }}></div>
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default DownloadPo;
