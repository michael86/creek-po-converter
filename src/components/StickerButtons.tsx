import { useState } from "react";
import { sumUpParcels } from "../utils";
import { Parts, setPartCount } from "../slices/purchaseOrders";
import { useAppDispatch } from "../hooks";

type Props = { qty: number | number[]; index: number; partNumbers: Parts };

const StickerButtons = ({ qty, index, partNumbers }: Props) => {
  const dispatch = useAppDispatch();
  const [inputState, setInputState] = useState<{
    parcelCountClicked: boolean;
    val: string;
    error: string;
  }>({
    parcelCountClicked: false,
    val: "",
    error: "",
  });

  const onClick = () => setInputState({ ...inputState, parcelCountClicked: true });

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

  return (
    <>
      <button className="no-print" onClick={onClick}>
        Change parcel count
      </button>
      {inputState.parcelCountClicked && (
        <>
          <input
            type="text"
            onInput={onInput}
            name="parcel-count"
            id="parcel-count"
            value={inputState.val}
          />
          <button onClick={onSubmit}>Submit</button>
          {inputState.error.length > 0 && <p>{inputState.error}</p>}
        </>
      )}
    </>
  );
};

export default StickerButtons;
