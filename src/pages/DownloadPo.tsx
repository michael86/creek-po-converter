import axios from "../utils/interceptors";
import { useEffect, useState } from "react";
import "../styles/stickers.css";
import SelectedStickers from "../components/StickerTable";
import { useAppDispatch, useAppSelector } from "../hooks";
import ReactLoading from "react-loading";
import {
  PurchaseOrder,
  PurchaseOrders,
  setPurchaseOrders,
  setPurchaseOrder,
} from "../slices/purchaseOrders";
import { setToast } from "../slices/alert";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface Res {
  data: { status: number; data?: PurchaseOrders | PurchaseOrder; token: string };
  status: number;
}

const DownloadPo = () => {
  const dispatch = useAppDispatch();
  const { purchaseOrders } = useAppSelector((state) => state.purchase);
  const [loading, setLoading] = useState(false);
  const [apiCalled, setApiCalled] = useState(false);
  const [value, setValue] = useState("");

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

  const onChange = async (e: SelectChangeEvent) => {
    try {
      setApiCalled(false);
      setLoading(true);
      const selectedPO = e.target.value;
      setValue(selectedPO);
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
      setLoading(false);
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
          <FormControl className="select-pdf">
            <InputLabel id="select-po-label">Select Po</InputLabel>
            <Select
              onChange={onChange}
              labelId="select-po-label"
              id="select-po"
              label="Age"
              value={value}
            >
              {purchaseOrders.map((purchaseOrder) => (
                <MenuItem key={purchaseOrder} value={purchaseOrder}>
                  {purchaseOrder}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      ) : (
        <p>Fetching orders</p>
      )}

      {loading && (
        <div className="flex flex-center">
          <ReactLoading type="balls" color="blue" />
          <p>Fetching data</p>
        </div>
      )}
      {apiCalled && <SelectedStickers />}
    </>
  );
};

export default DownloadPo;
