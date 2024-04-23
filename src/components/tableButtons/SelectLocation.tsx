import React, { Dispatch, SetStateAction } from "react";

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
  name: string;
};

const SelectLocation: React.FC<Props> = ({ setLocation, name }) => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => setLocation(e.target.value);
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
