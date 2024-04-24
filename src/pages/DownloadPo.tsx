import axios from "../utils/interceptors";
import { useEffect, useState } from "react";
import "../styles/stickers.css";
import SelectedStickers from "../components/StickerTable";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  PurchaseOrder,
  PurchaseOrders,
  setPurchaseOrders,
  setPurchaseOrder,
} from "../slices/purchaseOrders";
import { setToast } from "../slices/alert";

interface Res {
  data: { status: number; data?: PurchaseOrders | PurchaseOrder; token: string };
  status: number;
}

const DownloadPo = () => {
  const dispatch = useAppDispatch();
  const { purchaseOrders } = useAppSelector((state) => state.purchase);
  const [apiCalled, setApiCalled] = useState(false);

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const res: Res = await axios.get("pdf/fetch");

        if (res.data?.status === 1 && res.data?.data) {
          dispatch(setPurchaseOrders(res.data.data as PurchaseOrders));
        } else {
          console.error("Failed to fetch purchase orders: ", res);
        }
      } catch (error) {
        console.error("Error fetching purchase orders: ", error);
      }
    };

    fetchPurchaseOrders();
  }, [dispatch]);

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      setApiCalled(false);
      const selectedPO = e.target.value;
      const res: Res = await axios.get(`pdf/fetch/${selectedPO}`);
      if (res.status !== 200) {
        dispatch(
          setToast({
            type: "error",
            show: true,
            message:
              "Something went wrong there, please try again or contact Michael with the order number",
          })
        );
        return;
      }

      dispatch(setPurchaseOrder(res.data?.data as PurchaseOrder));
      setApiCalled(true);
    } catch (error) {
      console.error("Error fetching stickers data: ", error);
    }
  };

  return (
    <>
      {purchaseOrders ? (
        <div className="no-print select-pdf">
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

      {apiCalled && <SelectedStickers />}
    </>
  );
};

export default DownloadPo;
