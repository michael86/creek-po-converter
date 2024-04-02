import { Dispatch, SetStateAction, useRef, useState } from "react";
import { onParcelInput, sumUpParcels } from "../utils";
import { setPartCount } from "../slices/purchaseOrders";
import { useAppDispatch } from "../hooks";
import { setToast } from "../slices/alert";
import axios from "../utils/interceptors";

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
  const [partialConfirmed, setPartialConfirmed] = useState(partial);

  const [inputState, setInputState] = useState("");

  const onSubmit = () => {
    const parcels = inputState.split(",").map(Number);
    const sum = parcels.reduce((partialSum, a) => partialSum + a, 0);

    const errorMessage = sumUpParcels(sum, qty);

    if (
      (errorMessage && !partialConfirmed) ||
      (errorMessage && errorMessage.toLowerCase().includes("to many"))
    ) {
      dispatch(setToast({ show: true, message: errorMessage, type: "error" }));
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

    if (!partialRef.current || !partialRef.current.checked) return;

    const confirmationMessage = `Are you sure you want to set as a partial\nParts Expected: ${qty}\nParts Received: ${target}\nParts Remaining: ${remainingParts}`;

    if (!window.confirm(confirmationMessage)) return;

    const res = await axios.patch(`purchase/set-partial/${purchaseOrder}/${part.name}`);

    setPartialConfirmed(1);
    dispatch(setToast({ type: "success", message: "Partial confirmed", show: true }));
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => setLocation(e.target.value);

  return (
    <>
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

      <hr />

      <select className={"no-print"} onChange={onChange}>
        <option>Select Location</option>
        {LOCATIONS.map((location) => {
          return Array.from(Array(location[1]).keys()).map((loc) => {
            return <option key={location[0]}>{`${location[0]}-${loc + 1}`}</option>;
          });
        })}
      </select>

      <hr />

      <label htmlFor="partial-order" style={{ color: partialConfirmed ? "red" : "black" }}>
        Partial Order
      </label>

      {partialConfirmed === 0 && (
        <>
          <input
            type="checkbox"
            name="partial-order"
            id="partial-order"
            ref={partialRef}
            disabled={partialConfirmed ? true : false}
          />
          <button onClick={onConfirm}>Confirm</button>
        </>
      )}
    </>
  );
};

export default StickerButtons;
