import React, { Dispatch, SetStateAction, useEffect } from "react";
import axios from "../../utils/interceptors";
import { useAppDispatch } from "../../hooks";
import { setToast } from "../../slices/alert";

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
  setLocation: Dispatch<SetStateAction<string>>;
  order: string;
  part: string;
};

const SelectLocation: React.FC<Props> = ({ setLocation, order, part }) => {
  const dispatch = useAppDispatch();

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const res = await axios.post("/locations/update", {
      order,
      part,
      location: e.target.value,
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
    setLocation(e.target.value);
  };

  return (
    <>
      <select className={"no-print"} onChange={onChange}>
        <option>Select Location</option>
        {LOCATIONS.map((location) => {
          return Array.from(Array(location[1]).keys()).map((loc) => {
            return <option key={location[0]}>{`${location[0]}-${loc + 1}`}</option>;
          });
        })}
      </select>
    </>
  );
};

export default SelectLocation;
