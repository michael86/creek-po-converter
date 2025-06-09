import { Dispatch, SetStateAction } from "react";

export const getDateAsUnix = () => Math.floor(new Date().getTime() / 1000);

export const getDate = (date: number = getDateAsUnix(), toValue = false) => {
  const readable = new Date(date * 1000);

  const year = readable.getFullYear();
  const month = readable.getMonth();
  const day = readable.getDate();

  // Adjust for timezone offset
  const timezoneOffset = readable.getTimezoneOffset() * 60000; // Offset in milliseconds
  const adjustedDate = new Date(readable.getTime() - timezoneOffset);

  return toValue
    ? adjustedDate.toISOString().substring(0, 10)
    : `${day}/${month < 10 ? "0" : ""}${month + 1}/${year}`;
};

export const getRandomColor = () => `hsl(${Math.random() * 360}, 100%, 75%)`;

type OnParcelInput = (
  value: string,
  dispatch: Dispatch<SetStateAction<string>>
) => void;

export const onParcelInput: OnParcelInput = (value, dispatch) => {
  if (!value.match(/^\d*(,\d*)*$/)) return; // Only allow numeric input
  dispatch(value);
};

export const convertToHex = (number: number): string => number.toString(16);
export const convertToDec = (number: string): number => parseInt(number, 16);

export const manageConversion = (
  value: string,
  amount: number,
  radio: 1 | 0
) => {
  if (!value || !amount || typeof radio !== "number") return;

  const newData: { hex: string; decimal: number }[] = [];

  let base: number;

  // Handle decimal to hex or hex to decimal based on the radio
  if (radio === 1) {
    // Hex to Decimal
    base = convertToDec(value); // Convert hex string to decimal
  } else {
    // Decimal to Hex
    base = parseInt(value, 10); // Treat value as a decimal number
  }

  if (isNaN(base)) return; // If the base is invalid (NaN), return early

  for (let i = 0; i < amount; i++) {
    let hexValue: string;
    let decimalValue: number;

    if (radio === 0) {
      // Decimal to Hex conversion
      hexValue = convertToHex(base).toUpperCase();
      decimalValue = base;
    } else {
      // Hex to Decimal conversion
      hexValue = convertToHex(base).toUpperCase();
      decimalValue = base;
    }

    newData.push({ hex: hexValue, decimal: decimalValue });

    // Increment the base for the next iteration
    base++;
    value = base.toString(); // Update value for the next iteration
  }

  return newData;
};
