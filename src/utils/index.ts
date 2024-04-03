import { Dispatch, SetStateAction } from "react";

export const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${day}/${month < 10 && "0"}${month + 1}/${year}`;
};

export const getRandomColor = () => `hsl(${Math.random() * 360}, 100%, 75%)`;

export const sumUpParcels = (sum: number, target: number | number[]) => {
  if (typeof target === "number") {
    console.log("sum !== target ", sum !== target);
    return sum !== target;
  }

  if (Array.isArray(target)) {
    const _sum = target.reduce((partialSum, value) => partialSum + value, 0);
    console.log("sum !== target ", sum !== sum);
    return _sum !== sum;
  }

  return undefined;
};

type OnParcelInput = (value: string, dispatch: Dispatch<SetStateAction<string>>) => void;

export const onParcelInput: OnParcelInput = (value, dispatch) => {
  if (!value.match(/^\d*(,\d*)*$/)) return; // Only allow numeric input
  dispatch(value);
};
