import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

type PurchaseOrders = { purchase_order: string }[];
const DownloadPo = () => {
  const [fetched, setFetched] = useState<PurchaseOrders | null>(null);

  useEffect(() => {
    (async () => {
      const purchaseOrders = await axios.get("http://127.0.0.1:6005/pdf/fetch");
      if (purchaseOrders.data.status !== 1)
        console.log("failed to get purchase orders ", purchaseOrders);

      setFetched(purchaseOrders.data.data);
    })();
  }, []);

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const data = await axios.get(`http://127.0.0.1:6005/pdf/fetch/${e.target.value}`);

    console.log(data);
  };

  return (
    <>
      {fetched && (
        <>
          <p>Select Po to Download</p>
          <select onChange={onChange}>
            {fetched.map((purchase) => (
              <option key={purchase.purchase_order} value={purchase.purchase_order}>
                {purchase.purchase_order}
              </option>
            ))}
          </select>
        </>
      )}

      {!fetched && <p>Fetching orders</p>}
    </>
  );
};

export default DownloadPo;
