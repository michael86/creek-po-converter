import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setToast } from "../../slices/alert";
import { setPart } from "../../slices/purchaseOrders";

type Props = {
  name: string;
};

const SubmitParcels: React.FC<Props> = ({ name }) => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState("");
  const { partNumbers } = useAppSelector((state) => state.purchase.order!);
  const part = partNumbers[name];
  const { totalOrdered, partial } = part;
  const totalReceived = part.partsReceived.reduce((a, b) => a + b, 0);
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

    //Call api

    const copy = structuredClone(part);
    copy.partsReceived = [...copy.partsReceived, ...newParcels];
    dispatch(setPart({ key: name, part: copy }));
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
