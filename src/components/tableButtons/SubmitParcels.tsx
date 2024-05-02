import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setToast } from "../../slices/alert";
import { setPart } from "../../slices/purchaseOrders";
import axios from "../../utils/interceptors";
import { AxiosResponse } from "axios";
import { getDateAsUnix } from "../../utils";

type Props = {
  name: string;
  index: number;
};

const SubmitParcels: React.FC<Props> = ({ name, index }) => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState("");
  const { partNumbers, purchaseOrder } = useAppSelector((state) => state.purchase.order!);
  const part = partNumbers[index];
  const { totalOrdered, partial } = part;
  const totalReceived = part.partsReceived.reduce((a, b) => a + b.amountReceived, 0);
  const totalAwaited = totalOrdered - totalReceived;

  const onSubmit = async () => {
    if (!state.length) return;

    const newParcels = state.split(",").map((parcel) => +parcel);
    const newParcelsTotal = newParcels.reduce((a, b) => a + b, 0);
    const isGreaterThanZero = totalAwaited - newParcelsTotal >= 0;

    if (!isGreaterThanZero) {
      return dispatch(setToast({ type: "error", message: "To many parcels entered", show: true }));
    }

    if (!partial && totalOrdered - newParcelsTotal !== 0) {
      return dispatch(
        setToast({
          type: "error",
          message: "Not enough parcels, if this is a partial order, please first mark it as so",
          show: true,
        })
      );
    }

    type CustomResponse = { status: number; token: string };
    const res: AxiosResponse<CustomResponse> = await axios.put("/purchase/add-parcel", {
      parcels: newParcels,
      purchaseOrder,
      part: name,
    });

    if (res.status !== 200 || !res.data.status) {
      return dispatch(
        setToast({
          type: "error",
          message:
            "oops!! Something went wrong there, contact michael with the order reference and what part you tried to book parcels in for",
          show: true,
        })
      );
    }

    const copy = structuredClone(part);
    copy.partsReceived = [
      ...copy.partsReceived,
      ...newParcels.map((parcel) => {
        return {
          amountReceived: parcel,
          dateReceived: getDateAsUnix(),
        };
      }),
    ];
    dispatch(setPart({ index, part: copy }));
    setToast({
      type: "success",
      message: "Parcels added",
      show: true,
    });
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9,]*$/;
    if (!regex.test(e.target.value)) return;
    setState(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter parcel quantities"
        name="parcel-count"
        onInput={onInput}
        value={state}
      />

      <button onClick={onSubmit}>Submit Parcels</button>
    </>
  );
};

export default SubmitParcels;
