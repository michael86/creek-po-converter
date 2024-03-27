import axios from "../utils/interceptors";
import { useEffect, useState } from "react";
import "./styles/stickers.css";

import SelectedStickers from "./SelectedStickers";
import { useAppDispatch, useAppSelector } from "../hooks";
import { PurchaseOrders, setPurchaseOrders } from "../slices/purchaseOrders";

type Stickers = {
  purchaseOrder: string;
  orderRef: string;
  partNumbers: [[string, number, string]];
};

type Res = {
  data: { status: number; data?: PurchaseOrders; token: string };
  status: number;
};

const DownloadPo = () => {
  const dispatch = useAppDispatch();
  const { purchaseOrders } = useAppSelector((state) => state.purchase);
  const [selectedStickers, setSelectedStickers] = useState<Stickers | null>(null);

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const res: Res = await axios.get("pdf/fetch");

        if (res.data?.status === 1 && res.data?.data) {
          dispatch(setPurchaseOrders(res.data.data));
        } else {
          console.log("Failed to fetch purchase orders: ", res);
        }
      } catch (error) {
        console.error("Error fetching purchase orders: ", error);
      }
    };

    fetchPurchaseOrders();
  }, []);

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStickers(null);
    try {
      const selectedPO = e.target.value;
      const response = await axios.get(`pdf/fetch/${selectedPO}`);
      const stickersData: Stickers = response.data.data;
      setSelectedStickers(stickersData);
    } catch (error) {
      console.error("Error fetching stickers data: ", error);
    }
  };

  console.log(purchaseOrders);

  return (
    <>
      {purchaseOrders ? (
        <div className="no-print">
          <p>Select PO to Download</p>
          <select onChange={onChange}>
            <option>Select PO</option>
            {purchaseOrders.map((purchaseOrder) => {
              console.log("purchaseOrder ", purchaseOrder);
              return (
                <option key={purchaseOrder} value={purchaseOrder}>
                  {purchaseOrder}
                </option>
              );
            })}
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
