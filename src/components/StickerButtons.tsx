import { Dispatch, SetStateAction, useRef, useState } from "react";
import { onParcelInput, sumUpParcels } from "../utils";
import { Parts, setPartCount } from "../slices/purchaseOrders";
import { useAppDispatch } from "../hooks";
import { setToast } from "../slices/alert";

type Props = {
  qty: number | number[];
  index: number;
  partNumbers: Parts;
  setLocation: Dispatch<SetStateAction<string>>;
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

type InputState = {
  val: string;
  error: string;
};

const StickerButtons = ({ qty, index, partNumbers, setLocation }: Props) => {
  const dispatch = useAppDispatch();
  const partialRef = useRef<HTMLInputElement | null>(null);
  const [partialConfirmed, setPartialConfirmed] = useState(true);

  const [inputState, setInputState] = useState<InputState>({
    val: "",
    error: "",
  });

  const onSubmit = () => {
    const parcels = inputState.val.split(",").map(Number);
    const sum = parcels.reduce((partialSum, a) => partialSum + a, 0);

    const errorMessage = sumUpParcels(sum, qty);
    const notEnoughErrorMessage = errorMessage && errorMessage.toLowerCase().includes("not");

    if (errorMessage && (!notEnoughErrorMessage || !partialConfirmed)) {
      setInputState({
        ...inputState,
        error: errorMessage,
      });
      return;
    }

    setInputState({ ...inputState, error: "" });
    const copy = structuredClone(partNumbers);
    copy[index][1] = parcels.length > 1 ? parcels : parcels[0];

    dispatch(setPartCount(copy));
  };

  const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const target = inputState.val
      .split(",")
      .map(Number)
      .reduce((partialSum, value) => partialSum + value, 0);

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

    setPartialConfirmed(true);
    dispatch(setToast({ type: "success", message: "Partial confirmed", show: true }));
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => setLocation(e.target.value);

  return (
    <>
      <input
        type="text"
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          onParcelInput(e.target.value, setInputState, inputState)
        }
        placeholder="Enter parcel quantities"
        name="parcel-count"
        value={inputState.val}
      />

      <button onClick={onSubmit}>Submit Parcels</button>

      {inputState.error.length > 0 && <p>{inputState.error}</p>}
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

      <label htmlFor="partial-order">Partial Order</label>
      <input type="checkbox" name="partial-order" id="partial-order" ref={partialRef} />
      <button onClick={onConfirm}>Confirm</button>
    </>
  );
};

export default StickerButtons;
