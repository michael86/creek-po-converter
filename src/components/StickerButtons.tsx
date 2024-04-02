import { Dispatch, SetStateAction, useRef, useState } from "react";
import { onParcelInput, sumUpParcels } from "../utils";
import { setPartCount, setPartPartial } from "../slices/purchaseOrders";
import { useAppDispatch } from "../hooks";
import { setToast } from "../slices/alert";
import axios from "../utils/interceptors";
import "./styles/sticker_buttons.css";
import { AxiosResponse } from "axios";

type Props = {
  qty: number;
  setLocation: Dispatch<SetStateAction<string>>;
  partial: number;
  purchaseOrder: string;
  part: {
    name: string;
    quantityAwaited: number[];
    partial: 1 | 0;
    totalOrdered: number;
    description: string;
  };
};

const LOCATIONS = [
  ["A", 4],
  ["B", 15],
  ["C", 15],
  ["D", 15],
  ["E", 15],
  ["F", 20],
  ["G", 20],
  ["H", 20],
  ["I", 20],
  ["J", 15],
];

const StickerButtons = ({ qty, setLocation, partial, part, purchaseOrder }: Props) => {
  const dispatch = useAppDispatch();
  const partialRef = useRef<HTMLInputElement | null>(null);

  const [inputState, setInputState] = useState("");

  const showConfirmationMessage = (setPartial: boolean = false) => {
    const target = inputState.split(",").reduce((partialSum, value) => +partialSum + +value, 0);
    const remainingParts = +qty - target;

    const confirmationMessage = setPartial
      ? "Are you sure you want to set as a partial"
      : `Please double check the below settings and confirm\nThese commits are permanent\nParts Expected: ${qty}\nParts Received: ${target}\nParts Remaining: ${remainingParts}`;

    return window.confirm(confirmationMessage);
  };

  const onSubmit = async () => {
    const parcels = inputState.split(",").map(Number);
    const sum = parcels.reduce((partialSum, a) => partialSum + a, 0);

    const errorMessage = sumUpParcels(sum, qty);

    if (
      (errorMessage && !partial) ||
      (errorMessage && errorMessage.toLowerCase().includes("to many"))
    ) {
      dispatch(setToast({ show: true, message: errorMessage, type: "error" }));
      return;
    }

    if (!showConfirmationMessage()) return;

    const res: AxiosResponse = await axios.put(`/purchase/add-parcel`, {
      parcels,
      purchaseOrder,
      part: part.name,
    });

    if (res.status !== 200) {
      dispatch(
        setToast({
          type: "error",
          show: true,
          message: `Unable to add new parcels to order ${purchaseOrder}, please contact Michael`,
        })
      );
      return;
    }

    let copy = structuredClone(part.quantityAwaited);
    copy = parcels;

    dispatch(setPartCount({ key: part.name, parts: copy }));
  };

  const onConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const target = inputState.split(",").reduce((partialSum, value) => +partialSum + +value, 0);

    const remainingParts = +qty - target;

    if (remainingParts < 0) {
      dispatch(
        setToast({
          type: "error",
          message: "You're attempting to book in more than your ordered",
          show: true,
        })
      );
      return;
    }

    if (!partialRef.current || !partialRef.current.checked || !showConfirmationMessage(true))
      return;

    const res = await axios.patch(`purchase/set-partial/${purchaseOrder}/${part.name}`);

    if (!res.status) {
      dispatch(
        setToast({
          type: "error",
          message: `Unable to set as partial, please contact michael with order number ${purchaseOrder} and partnumber: ${part.name}`,
          show: true,
        })
      );
      return;
    }

    dispatch(setPartPartial({ key: part.name, partial: 1 }));
    dispatch(setToast({ type: "success", message: "Partial confirmed", show: true }));
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => setLocation(e.target.value);

  return (
    <span className="no-print button-container">
      <input
        type="text"
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          onParcelInput(e.target.value, setInputState)
        }
        placeholder="Enter parcel quantities"
        name="parcel-count"
        value={inputState}
      />

      <button onClick={onSubmit}>Submit Parcels</button>

      <hr style={{ border: "solid black 1px" }} />

      <select className={"no-print"} onChange={onChange}>
        <option>Select Location</option>
        {LOCATIONS.map((location) => {
          return Array.from(Array(location[1]).keys()).map((loc) => {
            return <option key={location[0]}>{`${location[0]}-${loc + 1}`}</option>;
          });
        })}
      </select>

      <hr style={{ border: "solid black 1px" }} />

      <p style={{ color: partial ? "red" : "black" }}>Partial Order</p>

      {partial === 0 && (
        <>
          <input
            type="checkbox"
            name="partial-order"
            id="partial-order"
            ref={partialRef}
            disabled={partial ? true : false}
          />
          <button onClick={onConfirm}>Confirm</button>
        </>
      )}
    </span>
  );
};

export default StickerButtons;
