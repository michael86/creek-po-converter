import { Dispatch, SetStateAction, useState } from "react";

type PartNumber = [[string, number[] | number]];
type Props = {
  partNumbers: PartNumber;
  setStickerByQty: Dispatch<SetStateAction<PartNumber>>;
  targetPart: string;
};

const findIndex2D = (arr: PartNumber, targetPart: string) => {
  let index = -1;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0].toLowerCase() === targetPart.toLowerCase()) {
      index = i;
      break;
    }
  }

  return index;
};

const sumUpParcels = (sum: number, target: [string, number | number[]]) => {
  if (typeof target[1] === "number") {
    return sum !== target[1] ? (sum > target[1] ? "To many parcels" : "Not enough parcels") : "";
  }

  if (Array.isArray(target[1])) {
    const _sum = target[1].reduce((partialSum, value) => partialSum + value, 0);
    return _sum !== sum && (_sum > sum ? "Not enough parcels" : "To many parcels");
  }

  return;
};

const StickerButtons = ({ partNumbers, setStickerByQty, targetPart }: Props) => {
  const targetIndex = findIndex2D(partNumbers, targetPart);
  const target = partNumbers[targetIndex];

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

    const errorMessage = sumUpParcels(sum, target);
    if (errorMessage) {
      setInputState({
        ...inputState,
        error: errorMessage,
      });
      return;
    }

    setInputState({ ...inputState, error: "" });

    partNumbers[targetIndex][1] = parcels;
    console.log("raising state");
    setStickerByQty([...partNumbers]);
  };

  return target.length ? (
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
  ) : null;
};

export default StickerButtons;
