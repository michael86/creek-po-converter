import { Dispatch, SetStateAction } from "react";

export const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${day}/${month < 10 && "0"}${month + 1}/${year}`;
};

export const getRandomColor = () => `hsl(${Math.random() * 360}, 100%, 75%)`;

type OnParcelInput = (value: string, dispatch: Dispatch<SetStateAction<string>>) => void;

export const onParcelInput: OnParcelInput = (value, dispatch) => {
  if (!value.match(/^\d*(,\d*)*$/)) return; // Only allow numeric input
  dispatch(value);
};

