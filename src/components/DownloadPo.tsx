import axios from "../utils/interceptors";
import { useEffect } from "react";
import "./styles/stickers.css";
import SelectedStickers from "./SelectedStickers";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  PurchaseOrder,
  PurchaseOrders,
  setPurchaseOrders,
  setPurchaseOrder,
} from "../slices/purchaseOrders";

interface Res {
  data: { status: number; data?: PurchaseOrders | PurchaseOrder; token: string };
  status: number;
}

const DownloadPo = () => {
  const dispatch = useAppDispatch();
  const { purchaseOrders } = useAppSelector((state) => state.purchase);

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const res: Res = await axios.get("pdf/fetch");

        if (res.data?.status === 1 && res.data?.data) {
          dispatch(setPurchaseOrders(res.data.data as PurchaseOrders));
        } else {
          console.log("Failed to fetch purchase orders: ", res);
        }
      } catch (error) {
        console.error("Error fetching purchase orders: ", error);
      }
    };

    fetchPurchaseOrders();
  }, [dispatch]);

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const selectedPO = e.target.value;
      const res: Res = await axios.get(`pdf/fetch/${selectedPO}`);

      dispatch(setPurchaseOrder(res.data?.data as PurchaseOrder));
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
              <option key={purchaseOrder} value={purchaseOrder}>
                {purchaseOrder}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>Fetching orders</p>
      )}

      <SelectedStickers />
    </>
  );
};

export default DownloadPo;
