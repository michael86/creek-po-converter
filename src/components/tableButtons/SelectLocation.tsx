import React from "react";
import axios from "../../utils/interceptors";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setToast } from "../../slices/alert";
import { setPart } from "../../slices/purchaseOrders";

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

type Props = {
  index: number;
};

const SelectLocation: React.FC<Props> = ({ index }) => {
  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state.purchase);

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!order) return;

    const res = await axios.post("/locations/update", {
      location: e.target.value,
      line: order.partNumbers[index].lineId,
    });

    if (res.status !== 200) {
      dispatch(
        setToast({
          type: "error",
          message: "Something went wrong there, contact michael",
          show: true,
        })
      );
    }

    dispatch(
      setToast({
        type: "success",
        message: "Location updated",
        show: true,
      })
    );

    if (!order) return;
    const copy = structuredClone(order);
    copy.partNumbers[index].location = e.target.value;
    dispatch(setPart({ index, part: copy.partNumbers[index] }));
  };

  return (
    <>
      <select className={"no-print"} onChange={onChange}>
        <option>Select Location</option>
        {LOCATIONS.map((location) => {
          return [...Array(location[1]).keys()].map((loc, i) => {
            return <option key={`${location[0]}-${i}`}>{`${location[0]}-${loc + 1}`}</option>;
          });
        })}
      </select>
    </>
  );
};

export default SelectLocation;
