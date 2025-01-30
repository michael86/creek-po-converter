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

export const convertToHex = (number: number) => number.toString(16);
export const convertToDec = (number: string) => parseInt(number, 16);

export const manageConversion = (value: string | number, amount: number) => {
  if (!value || !amount) return;

  const newData: { hex: string; decimal: number }[] = [];

  for (let i = 0; i < amount; i++) {
    typeof value === "string"
      ? newData.push({ hex: value.toUpperCase(), decimal: convertToDec(value) })
      : newData.push({ hex: convertToHex(value).toUpperCase(), decimal: value });

    if (typeof value === "number") {
      value++;
    } else if (typeof value === "string") {
      value = parseInt(value, 16);
      value++;
      value = value.toString(16);
    }
  }

  return newData;
};
