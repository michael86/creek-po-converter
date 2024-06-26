import { Dispatch, SetStateAction } from "react";

export const getDateAsUnix = () => Math.floor(new Date().getTime() / 1000);

export const getDate = (date: number = getDateAsUnix(), toValue = false) => {
  const readable = new Date(date * 1000);

  const year = readable.getFullYear();
  const month = readable.getMonth();
  const day = readable.getDate();
  const hour = readable.getHours();
  const mins = readable.getMinutes();

  // Adjust for timezone offset
  const timezoneOffset = readable.getTimezoneOffset() * 60000; // Offset in milliseconds
  const adjustedDate = new Date(readable.getTime() - timezoneOffset);

  return toValue
    ? adjustedDate.toISOString().substring(0, 10)
    : `${day}/${month < 10 ? "0" : ""}${month + 1}/${year} - ${hour}:${mins}`;
};

export const getRandomColor = () => `hsl(${Math.random() * 360}, 100%, 75%)`;

type OnParcelInput = (value: string, dispatch: Dispatch<SetStateAction<string>>) => void;

export const onParcelInput: OnParcelInput = (value, dispatch) => {
  if (!value.match(/^\d*(,\d*)*$/)) return; // Only allow numeric input
  dispatch(value);
};
