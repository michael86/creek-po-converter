import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setPart } from "../../slices/purchaseOrders";

type Props = {
  name: string;
};

const PartialConfirm: React.FC<Props> = ({ name }) => {
  const { partNumbers } = useAppSelector((state) => state.purchase.order!);
  const ref = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const part = partNumbers[name];

  const onConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!ref.current || !ref.current.checked) return;

    //Call api

    const copy = structuredClone(part);
    copy.partial = 1;
    dispatch(setPart({ key: name, part: copy }));
  };

  return (
    <>
      <p style={{ color: part.partial ? "red" : "black" }}>Partial Order</p>

      {part.partial === 0 && (
        <>
          <input
            type="checkbox"
            name="partial-order"
            id="partial-order"
            ref={ref}
            disabled={part.partial ? true : false}
          />
          <button onClick={onConfirm}>Confirm</button>
        </>
      )}
    </>
  );
};

export default PartialConfirm;
