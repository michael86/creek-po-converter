import { Dispatch, SetStateAction, useRef, useState } from "react";
import { sumUpParcels } from "../utils";
import { Parts, setPartCount } from "../slices/purchaseOrders";
import { useAppDispatch } from "../hooks";

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

const StickerButtons = ({ qty, index, partNumbers, setLocation }: Props) => {
  const dispatch = useAppDispatch();
  const partialRef = useRef<HTMLInputElement | null>(null);
  const [inputState, setInputState] = useState<{
    val: string;
    error: string;
  }>({
    val: "Enter parcels",
    error: "",
  });

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value.match(/^\d*(,\d*)*$/)) return; // Only allow numeric input
    setInputState({ ...inputState, val: value });
  };

  const onSubmit = () => {
    const parcels = inputState.val.split(",").map(Number);
    const sum = parcels.reduce((partialSum, a) => partialSum + a, 0);

    const errorMessage = sumUpParcels(sum, qty);
    if (errorMessage) {
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
    if (!partialRef.current || !partialRef.current.checked) return;
    console.log("save as partial");
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => setLocation(e.target.value);

  return (
    <>
      <input
        type="text"
        onInput={onInput}
        onFocus={() =>
          inputState.val.includes("Enter") && setInputState({ ...inputState, val: "" })
        }
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
