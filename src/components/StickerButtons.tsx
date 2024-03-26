import { Dispatch, SetStateAction, useState } from "react";

type Qty = { [key: string]: number[] };
type Props = {
  part: [string, number];
  qty: Qty;
  setQty: Dispatch<SetStateAction<Qty>>;
};

const StickerButtons = ({ part, qty, setQty }: Props) => {
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

    if (sum !== part[1]) {
      setInputState({
        ...inputState,
        error: sum > part[1] ? "Too many parcels" : "Not enough parcels",
      });
      return;
    }

    setInputState({ ...inputState, error: "" });
    qty[part[0]] = parcels;
    setQty({ ...qty });
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
          {inputState.error && <p>{inputState.error}</p>}
        </>
      )}
    </>
  );
};

export default StickerButtons;
