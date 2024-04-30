import { useEffect, useState } from "react";
import axios from "../utils/interceptors";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  PurchaseOrders,
  PurchaseOrder,
  setPurchaseOrders,
  setPurchaseOrder,
} from "../slices/purchaseOrders";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { setToast } from "../slices/alert";
import ReactLoading from "react-loading";

interface Res {
  data: { status: number; data?: PurchaseOrders | PurchaseOrder; token: string };
  status: number;
}

const PoSelect = () => {
  const dispatch = useAppDispatch();
  const { purchaseOrders } = useAppSelector((state) => state.purchase);
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
        <ReactLoading type={"balls"} color={"blue"} height={667} width={375} />
      )}
    </>
  );
};

export default PoSelect;
