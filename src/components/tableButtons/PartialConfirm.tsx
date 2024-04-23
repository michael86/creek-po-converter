import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setPart } from "../../slices/purchaseOrders";
import axios from "../../utils/interceptors";
import { AxiosResponse } from "axios";
import { setToast } from "../../slices/alert";

type Props = {
  name: string;
};

const PartialConfirm: React.FC<Props> = ({ name }) => {
  const { partNumbers, purchaseOrder } = useAppSelector((state) => state.purchase.order!);
  const ref = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const part = partNumbers[name];

  const onConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!ref.current || !ref.current.checked) return;

    type StatusRes = { status: number; token: string };
    const res: AxiosResponse<StatusRes> = await axios.patch(
      `/purchase/set-partial/${purchaseOrder}/${name}`
    );

    if (res.status !== 200 || !res.data.status) {
      return dispatch(
        setToast({
          type: "error",
          message:
            "oops something went wrong there, contact michael with the purchase order number",
          show: true,
        })
      );
    }

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
