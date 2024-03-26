import axios from "../utils/interceptors";
import { useEffect, useState } from "react";
import "./styles/stickers.css";

import SelectedStickers from "./SelectedStickers";

type PurchaseOrder = { purchase_order: string };
type Stickers = {
  purchaseOrder: string;
  orderRef: string;
  partNumbers: (string | number)[][];
};

const DownloadPo = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[] | null>(null);
  const [selectedStickers, setSelectedStickers] = useState<Stickers | null>(null);

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await axios.get("pdf/fetch");
        console.log("response ", response);
        if (response.data.status === 1) {
          setPurchaseOrders(response.data.data);
        } else {
          console.log("Failed to fetch purchase orders: ", response);
        }
      } catch (error) {
        console.error("Error fetching purchase orders: ", error);
      }
    };

    fetchPurchaseOrders();
  }, []);

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const selectedPO = e.target.value;
      const response = await axios.get(`pdf/fetch/${selectedPO}`);
      const stickersData: Stickers = response.data.data;
      setSelectedStickers(stickersData);
    } catch (error) {
      console.error("Error fetching stickers data: ", error);
    }
  };

  return (
    <>
      {purchaseOrders ? (
        <div className="no-print">
          <p>Select PO to Download</p>
          <select onChange={onChange}>
            <option>Select PO</option>
            {purchaseOrders.map((purchaseOrder) => (
              <option key={purchaseOrder.purchase_order} value={purchaseOrder.purchase_order}>
                {purchaseOrder.purchase_order}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>Fetching orders</p>
      )}

      {selectedStickers && <SelectedStickers selectedStickers={selectedStickers} />}
    </>
  );
};

export default DownloadPo;
